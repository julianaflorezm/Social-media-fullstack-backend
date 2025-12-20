export class Role {
  readonly #id: number;
  readonly #name: string;
  readonly #created: Date;
  readonly #updated: Date;

  constructor(id: number, name: string, created: Date, updated: Date) {
    this.#id = id;
    this.#name = name;
    this.#created = created;
    this.#updated = updated;
  }

  get id(): number {
    return this.#id;
  }

  get name(): string {
    return this.#name;
  }

  get created(): Date {
    return this.#created;
  }

  get updated(): Date {
    return this.#updated;
  }
}
