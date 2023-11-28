export function formatDate(date: Date, template: string): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return template
        .replace('hh', hours)
        .replace('mm', minutes)
        .replace('dd', day)
        .replace('MM', month)
        .replace('yyyy', year);
}

export const convertTime = (d: string) => {
    let date = new Date(d)
    return formatDate(date, 'hh:mm dd.MM.yyyy');
}

const formatNumberW1Digit = (num: number) => {
    return Math.round(num * 10) / 10;
}

export const convertSize = (size: number) => {
    if(size < 1024) {
        return formatNumberW1Digit(size) + ' b'
    }
    if(size < 1024 * 1024) {
        return formatNumberW1Digit(size / 1024) + ' Kb'
    }
    if(size < 1024 * 1024 * 1024) {
        return formatNumberW1Digit(size / 1024 / 1024) + ' Mb'
    }
    return formatNumberW1Digit(size / 1024 / 1024 / 1024) + ' Gb'
}