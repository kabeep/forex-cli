export interface ForexOptions extends BaseOptions {
    from: string;
    to: string;
    timeout: number;
    date: string;
}

export interface BaseOptions {
    _: Array<string | number>;
    $0: string;
}
