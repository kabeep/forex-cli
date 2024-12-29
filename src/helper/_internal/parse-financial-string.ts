function parseFinancialString(input: string) {
    const value = input.trim().toLowerCase();

    let total = 0;
    let currentValue = '';

    for (let i = 0; i < value.length; i++) {
        const char = value[i];

        if (/[0-9.]/.test(char)) {
            currentValue += char;
        } else if (/[kmb]/.test(char)) {
            const numberPart = Number.parseFloat(currentValue);
            if (Number.isNaN(numberPart)) return Number.NaN;

            switch (char) {
                case 'k':
                    total += numberPart * 1000;
                    break;
                case 'm':
                    total += numberPart * 1000000;
                    break;
                case 'b':
                    total += numberPart * 1000000000;
                    break;
            }

            currentValue = '';
        } else {
            return Number.NaN;
        }
    }

    if (currentValue) {
        const numberPart = Number.parseFloat(currentValue);
        if (Number.isNaN(numberPart)) return Number.NaN;
        total += numberPart;
    }

    return total;
}

export default parseFinancialString;
