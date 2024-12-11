import ora from 'ora';
import forex from './forex';
import { to } from './helper';
import i18n from './i18n';
import type { ForexOptions } from './types';

export type { ForexOptions };

async function main(options: ForexOptions) {
    const spinner = ora(`Fetching Forex (${options.date})...`).start();
    const [error, result] = await to(forex(options));

    if (error) {
        spinner.fail(i18n(`CMD_ERR_${error?.message ?? 'UNKNOWN'}`));
        return;
    }

    spinner.succeed(result ?? 'Empty output');
}

export default main;

export { default as i18n } from './i18n';
