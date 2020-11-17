export function useTitleCase(str: string) {
  return str
    .toLowerCase()
    .replace(/[^A-Za-z0-9]/g, ' ')
    .trim()
    .split(' ')
    .map((word, i) => {
      return i == 0 ? word : word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');
}
