import { randomInteger } from './random-integer';

export enum RandomStringDictionary {
  LOW,
  UP,
  NUM,
}

const data: Record<RandomStringDictionary, Array<string>> = {
  [RandomStringDictionary.LOW]: [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ],
  [RandomStringDictionary.UP]: [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ],
  [RandomStringDictionary.NUM]: [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ],
};

export function randomString(size: number, dictionaries?: Array<RandomStringDictionary>): string {
  let out = '';

  const symbols = (dictionaries || [
    RandomStringDictionary.LOW,
    RandomStringDictionary.UP,
    RandomStringDictionary.NUM,
  ]).map((key) => data[key]).flat();

  for (let i = 0; i < size; i++) {
    out += symbols[randomInteger(0, symbols.length)];
  }

  return out;
}
