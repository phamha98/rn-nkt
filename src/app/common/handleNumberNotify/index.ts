export function NotifyHandle(text: any): string {
  if (!text) {
    return '';
  }
  switch (typeof text) {
    case 'object':
    case 'symbol':
    case 'undefined':
    case 'function':
    case 'boolean':
    case 'string':
      return '';
    case 'bigint':
    case 'number':
      return handle(text.toString());
    default:
      return '';
  }
}
function handle(text: string): string {
  if (parseFloat(text) > 99) {
    return 99 + '+';
  }
  return text;
}
