import {describe, expect, test} from "vitest";
import {trackedObjectChanged} from "../util/trackedObjectChanged";

describe('trackedObjectChanged', () => {
  test('can report a changed object', () => {
    let changed = trackedObjectChanged(
      {
        name: 'Billy',
        age: 12,
      },
      {
        name: 'Billy',
        age: 13,
      },
      ['age']
    );

    expect(changed).toBe(true);

    changed = trackedObjectChanged(
      {
        name: 'Billy',
        age: 12,
      },
      {
        name: 'Billy Bob',
        age: 12,
      },
      ['name']
    );

    expect(changed).toBe(true);

    changed = trackedObjectChanged(
      {
        name: 'Billy',
        age: 12,
      },
      {
        name: 'Billy Bob',
        age: 13,
      },
      ['name', 'age']
    );

    expect(changed).toBe(true);
  });

  test('ignores changes that are not tracked', () => {
    let changed = trackedObjectChanged(
      {
        name: 'Billy',
        age: 12,
      },
      {
        name: 'Billy',
        age: 13,
      },
      ['name']
    );

    expect(changed).toBe(false);
  });

  test('ignores changes that are not tracked', () => {
    let changed = trackedObjectChanged(
      {
        name: 'Billy',
        age: 12,
      },
      {
        name: 'Billy',
        age: 13,
      },
      ['name']
    );

    expect(changed).toBe(false);

    changed = trackedObjectChanged(
      {
        name: 'Billy',
        age: 12,
      },
      {
        name: 'Billy Bob',
        age: 13,
      },
      []
    );

    expect(changed).toBe(false);
  });

  test('reports changes on complicated data', () => {
    let changed = trackedObjectChanged(
      {
        name: 'Billy',
        age: 12,
        metadata: {
          lastOnlineAt: 'now',
        }
      },
      {
        name: 'Billy',
        age: 13,
        metadata: {
          lastOnlineAt: 'now',
        }
      },
      ['metadata']
    );

    expect(changed).toBe(false);

    changed = trackedObjectChanged(
      {
        name: 'Billy',
        age: 12,
        metadata: {
          lastOnlineAt: 'now',
          nested: {
            array: [1, 2, 3]
          }
        }
      },
      {
        name: 'Billy',
        age: 12,
        metadata: {
          lastOnlineAt: 'now',
          nested: {
            array: [1, 2, 3]
          }
        }
      },
      ['metadata.nested.array']
    );

    expect(changed).toBe(false);

    changed = trackedObjectChanged(
      {
        name: 'Billy',
        age: 12,
        metadata: {
          lastOnlineAt: 'now',
          nested: {
            array: [1, 2, 3]
          }
        }
      },
      {
        name: 'Billy',
        age: 12,
        metadata: {
          lastOnlineAt: 'now',
          nested: {
            array: [1, 2]
          }
        }
      },
      ['metadata.nested.array']
    );

    expect(changed).toBe(true);

    changed = trackedObjectChanged(
      {
        name: 'Billy',
        age: 12,
        metadata: {
          lastOnlineAt: 'now',
          nested: {
            array: [1, 2, 3],
            hello: 'world'
          }
        }
      },
      {
        name: 'Billy',
        age: 12,
        metadata: {
          lastOnlineAt: 'now',
          nested: {
            array: [1, 2, 3],
            hello: 'world changed'
          }
        }
      },
      ['metadata.nested']
    );

    expect(changed).toBe(true);
  });

  test('ignores irrelevant changes on complicated data', () => {
    let changed = trackedObjectChanged(
      {
        name: 'Billy',
        age: 12,
        metadata: {
          lastOnlineAt: 'now',
        }
      },
      {
        name: 'Billy',
        age: 12,
        metadata: {
          lastOnlineAt: 'now and later',
        }
      },
      ['age']
    );

    expect(changed).toBe(false);

    changed = trackedObjectChanged(
      {
        name: 'Billy',
        age: 12,
        metadata: {
          lastOnlineAt: 'now',
          bing: 123,
        }
      },
      {
        name: 'Billy',
        age: 12,
        metadata: {
          lastOnlineAt: 'now and later',
          bing: 123
        }
      },
      ['metadata.bing']
    );

    expect(changed).toBe(false);
  });
});

