import ora, { type Ora } from 'ora';
import i18n from './i18n';
import { to } from './index';

function boundary<T extends unknown[] = unknown[], R = unknown>(
    function_: (...arguments_: [...T, Ora]) => Promise<R | undefined>,
) {
    return async (...arguments_: T): Promise<R | undefined> => {
        const spinner = ora();

        const [error, result] = await to(function_(...arguments_, spinner));

        if (error) {
            spinner.fail(i18n(`CMD_ERR_${error?.message ?? 'UNKNOWN'}`));
            return;
        }

        if (!result) {
            spinner.fail(result?.toString() ?? i18n('CMD_ERR_UNKNOWN'));
            return;
        }

        console.log(`✨ ${result}`);
    };
}

export default boundary;
