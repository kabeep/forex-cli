import paddedDate from './padded-date';

function formatDate(value: Date, pattern = 'YYYY-MM-DD') {
    const tokens: Record<string, string> = {
        YYYY: value.getFullYear().toString(),
        MM: paddedDate(value.getMonth() + 1),
        DD: paddedDate(value.getDate()),
    };

    return pattern.replaceAll(/YYYY|MM|DD/g, (match) => tokens[match]);
}

export default formatDate;
