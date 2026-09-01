// Defense-in-depth: strips HTML/script constructs from free-text user input before it is
// persisted, independent of Vue's output-escaping on the frontend.
const HTML_TAG_PATTERN = /<[^>]*>/g;
const DANGEROUS_PROTOCOL_PATTERN = /(javascript|data|vbscript):/gi;
const CONTROL_CHAR_PATTERN = /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g;

export function sanitizeText(value: string): string {
  return value
    .replace(HTML_TAG_PATTERN, '')
    .replace(DANGEROUS_PROTOCOL_PATTERN, '')
    .replace(CONTROL_CHAR_PATTERN, '')
    .trim();
}
