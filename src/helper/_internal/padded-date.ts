function paddedDate(value: number | string, length = 2, padding = '0') {
    return `${value}`.padStart(length, padding);
}

export default paddedDate;
