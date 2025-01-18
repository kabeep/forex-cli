import clipboard from 'clipboardy';
import type { Ora } from 'ora';
import { ensure, to, useHandler } from './index';

function useClipboard(value: string | number, spinner?: Ora) {
    return useHandler(
        'CMD_OPTION_CLIPBOARD',
        async () => {
            const [err] = await to(clipboard.write(`${value}`));
            ensure(!err, 'CMD_ERR_CLIPBOARD_WRITE');
        },
        {},
        spinner,
    );
}

export default useClipboard;
