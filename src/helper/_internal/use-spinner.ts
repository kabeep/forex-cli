import type { Ora } from 'ora';

async function useSpinner<T = void>(fn: () => T | Promise<T>, spinner?: Ora) {
    spinner?.stop();
    const result = await fn();
    spinner?.start();
    return result;
}

export default useSpinner;
