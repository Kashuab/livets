export type ActionRaisedErrorInit = {
  code: string | number;
  message?: string;
}

export class ActionRaisedError extends Error {
  code: string | number;

  constructor(init: ActionRaisedErrorInit) {
    super();

    this.code = init.code;
    this.message = init.message || '';
  }
}