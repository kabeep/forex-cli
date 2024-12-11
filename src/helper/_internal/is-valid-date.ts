import { isDate } from 'node:util/types';

function isValidDate(date: unknown): date is Date {
    return isDate(date) && !Number.isNaN(date.getTime());
}

export default isValidDate;
