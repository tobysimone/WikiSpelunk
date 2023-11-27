export function overflowString(str: string, maxLength: number = 15) {
    if(!str) {
        return '';
    }

    return str.length > maxLength ? 
        `${str.substring(0, maxLength)}...` : 
        str;
}