export interface StatisticOptions {
    groupSeparator?: string;
    decimalSeparator?: string;
    precision?: number;
}

function useStatistic(
    value: string | number,
    {
        groupSeparator = ',',
        decimalSeparator = '.',
        precision,
    }: StatisticOptions = {},
) {
    const val = String(value);
    // TODO: This is an unsafe regex. Make it safe.
    const cells = val.match(/^(-?)(\d*)(\.(\d+))?$/);
    if (!cells) return 'Invalid Number';

    const negative = cells[1];
    let int = cells[2] || '0';
    let decimal = cells[4] || '';

    int = int.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);

    if (typeof precision === 'number') {
        decimal = decimal
            .padEnd(precision, '0')
            .slice(0, precision > 0 ? precision : 0);
    }

    if (decimal) {
        decimal = `${decimalSeparator}${decimal}`;
    }

    return `${negative}${int}${decimal}`;
}

export default useStatistic;
