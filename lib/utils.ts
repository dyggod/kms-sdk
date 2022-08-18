export function base64Encode(str: string) {
  const buff = Buffer.from(str, 'utf-8');
  return buff.toString('base64');
}

export function base64Decode(base64Str: string) {
  const buff = Buffer.from(base64Str, 'base64');
  return buff.toString('utf-8');
}
