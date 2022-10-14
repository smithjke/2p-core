export function b64Encode(obj: any): string {
  const str = JSON.stringify(obj);

  try {
    return btoa(str);
  } catch (err) {
    const buffer: any = eval('Buffer');
    return buffer.from(str).toString('base64');
  }
}

export function b64Decode(str: string): any {
  try {
    return JSON.parse(
      atob(str)
    );
  } catch (err) {
    const buffer: any = eval('Buffer');
    return JSON.parse(
      buffer.from(str, 'base64').toString()
    );
  }
}
