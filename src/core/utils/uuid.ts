import { randomInteger } from './random-integer';

export const uuid = (): string => [
  randomInteger(0x10000000, 0xffffffff).toString(16),
  randomInteger(0x1000, 0xffff).toString(16),
  randomInteger(0x1000, 0xffff).toString(16),
  randomInteger(0x1000, 0xffff).toString(16),
  randomInteger(0x100000000000, 0xffffffffffff).toString(16)
].join('-');
