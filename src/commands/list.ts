import { ForexClient } from '@kabeep/forex';
import type { Ora } from 'ora';
import Table from 'terminal-table';
import {
    boundary,
    ensure,
    formatDate,
    palette,
    to,
    toDate,
    useHandler,
} from '../helper';
import useTranslate from '../helper/_internal/use-translate';
import type { ListOptions } from './types';

async function list(
    {
        pretty = false,
        date: dateString = 'latest',
        timeout = 10_000,
        translate = false,
    }: ListOptions,
    spinner: Ora,
) {
    const isLatest = dateString === 'latest';
    const date = isLatest ? 'latest' : toDate(dateString);
    const formatDateString = isLatest
        ? (date as string)
        : formatDate(date as Date);

    const client = new ForexClient({ timeout });

    const currencies = await useHandler(
        'CMD_MSG_FETCH_CURRENCIES',
        async () => {
            const [err, result] = await to(client.getCurrencies(date));
            ensure(!err, 'TIMEOUT_CURRENCIES');
            ensure(result.data?.length, 'INVALID_CURRENCIES');
            return result.data;
        },
        { date: formatDateString },
        spinner,
    );

    const translation = await useHandler(
        'CMD_MSG_FETCH_TRANSLATION',
        async () => {
            const [_, result] = translate
                ? await to(
                      useTranslate(
                          currencies.map((item) => item.name),
                          { timeout },
                      ),
                  )
                : [undefined, undefined];
            return result;
        },
        { date: formatDateString },
        translate ? spinner : undefined,
    );

    if (!pretty) {
        return currencies
            .map((item, index) => {
                const uppercaseCode = item.code.toUpperCase();
                return `${palette.yellow(item.name || uppercaseCode)} / ${translation?.[index] || ' - '} (${palette.blue(uppercaseCode)})`;
            })
            .join('\n');
    }

    const data = currencies.map(({ name, code }, index) => [
        palette.blue(code.toUpperCase()),
        palette.yellow(name || ' - '),
        translation?.[index] || ' - ',
    ]);

    const table = new Table({
        width: [6, 32, 42],
        borderStyle: 2,
        horizontalLine: true,
    });

    table.push(
        [
            palette.green('CODE'),
            palette.green('NAME'),
            palette.green('TRANSLATION'),
        ],
        ...data,
    );

    return `\n${table}`;
}

export default boundary<[ListOptions]>(list) as (
    options: ListOptions,
) => Promise<void>;
