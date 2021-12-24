export function padStart(
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
      return handlePadStart(text.toString(), maxLength, padString);
    case 'string':
      return handlePadStart(text, maxLength, padString);
    default:
      return '';
  }
}

function handlePadStart(
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
