import {describe, expect, test} from "vitest";
import {lobbyStore} from "./index";

describe('store tests', () => {
  test('state actions work predictably', () => {
    const store = lobbyStore({
      username: '',
      nested: { test: 3 }
    });

    store.actions.setUsername('bonk');
    store.actions.setNestedTest(1234);

    expect(store.state).toEqual({
      username: 'bonk',
      nested: { test: 1234 }
    });
  })
})