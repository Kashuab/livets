# Live.ts

Type-safe real-time state management built on top of Socket.IO

> **Note:**
> This library is experimental and may never be production ready.
> It is currently not available on `npm` either.

---

## Setup

(This isn't on NPM just yet, documentation is here for design purposes.)

`yarn add live.ts`

### Server-side

```ts
import { createStore, createRoom, createServer } from 'live.ts';

type Message = {
  content: string;
}

type ThreadState = {
  messages: Message[];
}

const threadStore = createStore((state: ThreadState) => ({
  messageCreate: (message: Message) => {
    state.messages.push(message);
  }
}));

const thread = createRoom({
  store: threadStore,
  getInitialState: async (id) => {
    // fetch thread from db/redis/etc.
    // Or return some defaults.
    return { messages: [] }
  },
  persist: async (id, state) => {
    // This is ran after an action is processed.
    // This may not be needed in all cases.
  }
});

const server = createServer({
  port: 3000,
  wss: process.env.NODE_ENV === 'production',
  rooms: { thread }
});

// For the client to consume and provide type-safe access
export type Server = typeof server;

console.log('Thread service ready on port 3000');
```

## Client-side

`Live.ts` provides first-class support for React.

```tsx
import { useState } from "react";
import { createReactClient } from "live.ts";
import type { Server } from "~/path/to/server";

const client = createReactClient<Server>('ws://localhost:3000');

function SomeComponent() {
  const { state, actions } = client.thread.useStore('<thread-id>');

  const [message, setMessage] = useState('');

  return (
    <div>
      <h1>Messages</h1>

      {state.messages.map(message => (
        <p>{message.content}</p>
      ))}

      <textarea value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={() => actions.messageCreate({ content })}>Send</button>
    </div>
  );
}
```

> **Note:** Live.ts uses recursive proxies to track the data you access from a store's `state`.
> This is done to ensure your component only re-renders if the data it needs changes.

### Standalone client

There is also a standalone client:

```tsx
import { createClient } from "live.ts";
import type { Server } from "~/path/to/server";

const client = createClient<Server>('ws://localhost:3000');
const threadStore = client.thread.getStore('<thread id>');

// Actions return a `ActionResult`, including the latest state
const { state } = await threadStore.actions.messageCreate({ content: 'Test message' });

console.log(state) // -> { messages: [{ content: 'Test message' }] }
```

## Error handling

### Server-side

In the function provided to `createStore`, the second argument contains a variety of tools at your
disposal. This includes a way to raise an error that you can handle on the front-end.

```ts
// In a separate file to avoid importing server code
export enum Error {
  UnexpectedError,
  EmptyMessageContent
}

const threadStore = createStore((state: ThreadState, ctx) => ({
  messageCreate: (message: Message) => {
    if (message.content.length === 0) {
      // TODO: This could be confusing. ctx.raise actually throws an error,
      // so the following return statement is unnecessary. It's not clear, though.
      ctx.raise(Error.EmptyMessageContent, 'message content must not be empty');
      return;
    }

    if (1 + 1 > 2) {
      ctx.raise(Error.UnexpectedError, 'optional message');
      return;
    }

    state.messages.push(message);
  }
}));

// createRoom, createServer, etc.
```

### Client-side

#### Standalone

```ts
import { createClient } from "live.ts";
import type { Server } from "~/path/to/server";
import { Error } from "~/path/to/server/errors";

const client = createClient<Server>('ws://localhost:3000');
const threadStore = client.thread.getStore('<thread id>');

// The `ActionResult` type also contains an `error` property
const { error, state } = await threadStore.actions.messageCreate({ content: 'Error me out dude' })

if (error && error.code === Error.UnexpectedError) {
  // uh-oh!
}
```

#### React

```tsx
import { useState } from "react";
import { createReactClient, useAction } from "live.ts";
import type { Server } from "~/path/to/server";
import { Error } from "~/path/to/server/errors";

const client = createReactClient<Server>('ws://localhost:3000');

function SomeComponent() {
  const { state, actions } = client.thread.useStore('<thread-id>');

  const [message, setMessage] = useState('');
  
  return (
    <div>
      <h1>Messages</h1>

      {state.messages.map(message => (
        <p>{message.content}</p>
      ))}

      <textarea
        value={message}
        onChange={e => setMessage(e.target.value)}
      />

      <button
        onClick={async () => {
          const { error, state } = await actions.messageCreate({ content });
          
          if (error && error.code === Error.UnexpectedError) {
            // uh-oh!
            console.error('Bad!', error)
          }

          console.log('New state:', state);
        }}
      >
        Send
      </button>
    </div>
  );
}
```

## Optimistic updates

Use the `propose` function found within an action function. Provide a callback containing store mutations, followed by
the action's arguments.

> Note: This might change. I'm not a fan of how you have to provide the state proposal
> before the action arguments

```tsx
import { useState } from "react";
import { createReactClient } from "live.ts";
import type { Server } from "~/path/to/server";

const client = createReactClient<Server>('ws://localhost:3000');

function SomeComponent() {
  const { state, actions } = client.thread.useStore('<thread-id>');
  const { messageCreate } = actions;
  const { messages } = state;

  const [message, setMessage] = useState('');

  const handleSendClick = async () => {
    await actions.messageCreate.propose(
      state => state.messages.push({ content }),
      { content }
    );
  }

  return (
    <div>
      <h1>Messages</h1>

      {state.messages.map(message => (
        <p>{message.content}</p>
      ))}

      <textarea value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={handleSendClick}>Send</button>
    </div>
  );
}
```

## TODO: Cache adapters

By default, `live.ts` keeps all stores in-memory. At scale you might consider using `redis` to add a layer of redundancy.

```ts
import { createStore, createRoom, createServer, redisCacheAdapter } from 'live.ts';

// ... createStore, etc

const thread = createRoom({
  store: threadStore,
  cacheAdapter: redisCacheAdapter({ url: '...' }),
  getInitialState: async (id) => {
    // If the thread exists in redis, the cache adapter will handle it.
    // So if this function is called, you need to fetch the thread from your database.
    
    // ... or, return some defaults.
    return { messages: [] }
  },
  persist: async (id, state) => {
    // This is ran after an action is processed.
    // This may not be needed in all cases.
  }
});

// ... createServer, etc

```


# TODO:

1. Persistence layer adapters (cache, db)

Other cache methods are needed for redundancy in case the server dies and/or memory is restricted. Currently, stores
are stored in memory which is impractical at scale.

DB storage is also interesting, I question whether or not actions are the correct place to put database operations.
For the sake of performance, I'd say cache _should_ be the source of truth, and the database serves as async storage
when a given room is empty and its resources are vacated from the cache.

2. Efforts to prevent de-sync (poll server for state via hash/timestamp, sync on window focus, etc)
3. More robust config for `createServer`
4. Reconcile names (`createStore`, `createRoom`, etc. are confusing)
5. Action utils (authentication, context, etc.)
6. Better documentation, guides, examples
7. Tests (there are some, need more coverage)

# Philosophy

I've really enjoyed working with [tRPC](https://trpc.io/). This library takes a lot of inspiration from it. However,
handling complicated websocket logic for something like a game carried too much friction.

The vision here is to build something that feels like simple state management without the overhead of managing websocket
connections.