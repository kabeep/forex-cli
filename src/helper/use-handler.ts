import type { Ora } from 'ora';
import useDuration from './_internal/use-duration';
import i18n from './i18n';
import palette from './palette';

async function useHandler<T>(
    title: string,
    handler: () => Promise<T>,
    options: Record<string, string> = {},
    spinner?: Ora,
) {
    spinner?.start(i18n.t(title, { ...options, time: palette.grey('- ms') }));

    const timer = useDuration();
    const result = await handler();

    spinner?.succeed(i18n.t(title, { ...options, time: timer() }));

    return result;
}

export default useHandler;
