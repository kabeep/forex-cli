export type CustomError = Error & {
    data?: Record<string, string>;
};

function ensure(
    condition: unknown,
    message?: string | (() => string),
    data?: Record<string, string>,
): asserts condition {
    if (condition) {
        return;
    }

    const providedMessage = typeof message === 'function' ? message() : message;

    const error = new Error(providedMessage ?? 'UNKNOWN') as CustomError;
    if (data) error.data = data;

    throw error;
}

export default ensure;
