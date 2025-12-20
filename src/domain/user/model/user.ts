import { hash, compare } from 'bcrypt';
import { BussinessError } from '../../../domain/errors/bussiness-error';
import { Role } from '../../../domain/role/model/role';
import { INCORRECT_PASSWORD } from '../../../domain/errors/common-messages';
import { HttpStatus } from '@nestjs/common';

export class User {
  readonly #id: number;
  readonly #name: string;
  readonly #password: string;
  readonly #email: string;
  readonly #phone: string;
  #role?: Role;
  readonly #created: Date;
  readonly #updated: Date;

  constructor(
    id: number,
    name: string,
    password: string,
    email: string,
    phone: string,
    created: Date,
    updated: Date,
    role?: Role,
  ) {
    this.#id = id;
    this.#name = name;
    this.#password = password;
    this.#email = email;
    this.#phone = phone;
    this.#role = role;
    this.#created = created;
    this.#updated = updated;
  }

  static async create(
    name: string,
    password: string,
    email: string,
    phone: string,
    role?: Role,
  ) {
    //this.validarTamanoClave(password);
    password = await this.encryptPass(password);
    const id = 0;
    const createdAt = new Date('');
    const updatedAt = new Date('');
    return new this(
      id,
      name,
      password,
      email,
      phone,
      createdAt,
      updatedAt,
      role,
    );
  }

  set role(role: Role) {
    this.#role = role;
  }

  static async encryptPass(password: string) {
    return await hash(password, 10);
  }

  /*static validarTamanoClave(clave: string) {
    if (clave.length < NUMERO_MINIMO_CARACTERES_CLAVE) {
      throw new ErrorLongitudInvalida(
        `El tamaño mínimo de la clave debe ser ${NUMERO_MINIMO_CARACTERES_CLAVE} caracteres`,
      );
    }
  }*/

  static async comparePassword(password, encryptPass) {
    if (!(await compare(password, encryptPass))) {
      throw new BussinessError(INCORRECT_PASSWORD, HttpStatus.BAD_REQUEST);
    }
    return true;
  }

  get id(): number {
    return this.#id;
  }

  get name(): string {
    return this.#name;
  }

  get password(): string {
    return this.#password;
  }

  get email(): string {
    return this.#email;
  }

  get phone(): string {
    return this.#phone;
  }

  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  get role(): Role | undefined {
    return this.#role;
  }

  get created(): Date {
    return this.#created;
  }

  get updated(): Date {
    return this.#updated;
  }
}
