export interface BaseOptions {
    _: Array<string | number>;
    $0: string;
}

export interface CommandOptions extends BaseOptions {
    date?: string;
    timeout?: number;
    clipboard?: boolean;
    translate?: boolean;
    verbose?: boolean;
}

export interface CurrencyOptions extends CommandOptions {
    code?: string;
}

export interface ConvertOptions extends CommandOptions {
    from?: string;
    to?: string;
    amount?: string;
}

export interface ListOptions extends CommandOptions {
    pretty?: boolean;
}
