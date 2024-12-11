import isValidDate from './_internal/is-valid-date';
import ensure from './ensure';

function toDate(value: string) {
    const date = new Date(value);
    ensure(isValidDate(date), 'INVALID_DATE');

    return date;
}

export default toDate;
