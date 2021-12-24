export function padEnd(
  text: any,
  maxLength: number,
  padString: string,
): string {
  if (!text) {
    return '';
  }
  switch (typeof text) {
    case 'object':
    case 'symbol':
    case 'undefined':
    case 'function':
    case 'boolean':
      return '';
    case 'bigint':
    case 'number':
      return handlePadEnd(text.toString(), maxLength, padString);
    case 'string':
      return handlePadEnd(text, maxLength, padString);
    default:
      return '';
  }
}

function handlePadEnd(
  text: string,
  maxLength: number,
  padString: string,
): string {
  if (text.length <= maxLength) {
    return text;
  }
  let strResult = '';
  for (let index = 0; index < text.length; index++) {
    if (index > maxLength) {
      strResult += padString;
    }
  }
  return text.substring(0, maxLength) + strResult;
}
