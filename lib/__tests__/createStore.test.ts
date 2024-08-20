import { describe, expect, it } from "vitest";
import { createStore } from "../createStore";

type ExampleState = {
  hello: string;
}

describe('createStore', () => {
  it('actions can fire other actions', () => {
    const createExampleStore = createStore((state: ExampleState) => ({
      setHello(text: string) {
        state.hello = text;
      },
      setHelloToBong() {
        expect(state.hello).toBe('test');
        this.setHello('bong');
      }
    }));

    const store = createExampleStore({
      hello: 'world'
    });

    expect(store.state.hello).toBe('world');

    // @ts-ignore: TODO: action types expecting actor at runtime
    store.actions.setHello({}, 'test');
    expect(store.state.hello).toBe('test');

    store.actions.setHelloToBong();
    expect(store.state.hello).toBe('bong');
  })
})