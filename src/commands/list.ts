import { ForexClient } from '@kabeep/forex';
import type { Ora } from 'ora';
import Table from 'terminal-table';
import { boundary, ensure, i18n, to, toDate, useDuration } from '../helper';
import formatDate from '../helper/_internal/format-date';
import useTranslate from '../helper/_internal/use-translate';
import createPalette from '../helper/craete-palette';
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

    const green = createPalette(32);
    const yellow = createPalette(33);
    const blue = createPalette(34);

    const currenciesOptions = { date: formatDateString, time: '' };
    spinner.start(i18n('CMD_MSG_FETCH_CURRENCIES', currenciesOptions));
    const currenciesTimer = useDuration();
    const [err, currencies] = await to(client.getCurrencies(date));
    currenciesOptions.time = currenciesTimer();
    ensure(!err, 'TIMEOUT_CURRENCIES');

    const currenciesList = currencies.data;
    ensure(currenciesList?.length, 'INVALID_CURRENCIES');
    spinner.succeed(i18n('CMD_MSG_FETCH_CURRENCIES', currenciesOptions));

    translate &&
        spinner.start(i18n('CMD_MSG_FETCH_TRANSLATION', currenciesOptions));
    const translateTimer = useDuration();
    const [_, translation] = translate
        ? await to(
              useTranslate(
                  currenciesList.map((item) => item.name),
                  { timeout },
              ),
          )
        : [undefined, undefined];
    currenciesOptions.time = translateTimer();
    translate &&
        spinner.succeed(i18n('CMD_MSG_FETCH_TRANSLATION', currenciesOptions));

    if (!pretty)
        return currenciesList
            .map((item, index) => {
                const uppercaseCode = item.code.toUpperCase();
                return `${yellow(item.name || uppercaseCode)} / ${translation?.[index] || ' - '} (${blue(uppercaseCode)})`;
            })
            .join('\n');

    const data = currenciesList.map(({ name, code }, index) => [
        blue(code.toUpperCase()),
        yellow(name || ' - '),
        translation?.[index] || ' - ',
    ]);

    const table = new Table({
        width: [6, 32, 42],
        borderStyle: 2,
        horizontalLine: true,
    });

    table.push([green('CODE'), green('NAME'), green('TRANSLATION')], ...data);

    return `\n${table}`;
}

export default boundary<[ListOptions]>(list) as (
    options: ListOptions,
) => Promise<void>;
