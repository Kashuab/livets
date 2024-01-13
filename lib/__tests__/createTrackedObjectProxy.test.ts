import {describe, expect, test} from 'vitest';
import {createTrackedObjectProxy} from "../util/createTrackedObjectProxy";

type Person = {
  name: string;
  age: number;
  metadata?: {
    lastOnlineAt: string;
  }
}

describe('createTrackedObjectProxy', () => {
  test('should create a trackable object', () => {
    const person: Person = {
      name: 'Billy',
      age: 21,
    };

    const tracked: string[] = [];

    const proxy = createTrackedObjectProxy(person, path => {
      tracked.push(path);
    });

    console.log(proxy.name, proxy.age);
    console.log(proxy.metadata?.lastOnlineAt);
    expect(tracked).toEqual(['name', 'age', 'metadata']);

    proxy.metadata = { lastOnlineAt: 'now' };
    expect(tracked).toEqual(['name', 'age', 'metadata']);

    console.log(proxy.metadata.lastOnlineAt);

    expect(tracked).toEqual(['name', 'age', 'metadata', 'metadata', 'metadata.lastOnlineAt']);
  });
});
