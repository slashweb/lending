export const shortenString = (str: `0x${string}` | undefined): string => {
    if (!str) return '';
    if (str.length <= 8) return str;
    return `${str.slice(0, 4)}...${str.slice(str.length - 4, str.length)}`;
}