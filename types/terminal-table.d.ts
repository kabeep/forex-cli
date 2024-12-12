// terminal-table
declare module "terminal-table" {

    interface BorderStyle {
        sep: string;
        topLeft: string; topMid: string; top: string; topRight: string;
        midLeft: string; midMid: string; mid: string; midRight: string;
        botLeft: string; botMid: string; bot: string; botRight: string;
    }

    interface TableOptions {
        borderStyle?: number;
        border?: BorderStyle;
        horizontalLine?: boolean;
        width?: (number | string)[];
        rightPadding?: number;
        leftPadding?: number;
    }

    interface CellAttributes {
        align?: "left" | "center" | "right";
        color?: string;
        bg?: string;
        leftPadding?: number;
        rightPadding?: number;
    }

    interface Range {
        row?: [number, number];
        column?: [number, number];
    }

    class Table {
        constructor(options?: TableOptions);

        table: Array<Array<{ text: string } | undefined>>;
        attrMap: Array<{ row: [number, number]; column: [number, number]; attr: CellAttributes }>;
        borderStyle: number | undefined;
        horizontalLine: boolean;
        width: Array<number | string>;
        rightPadding: number;
        leftPadding: number;
        border: BorderStyle;

        space(n: number): string;
        strlen(text: string): number;
        pad(text: string, n: number, align: 0 | 1 | 2): string;
        format(row: number, column: number, size: number): string;
        maxcell(column: number): number;
        calcWidth(): number[];
        horlen(): number;
        init(row: number, column: number): void;
        attr(row: number, column: number, attr: CellAttributes): void;
        attrRange(range: Range, attr: CellAttributes): void;
        getRange(row: number, column: number, attr: keyof CellAttributes): unknown;
        getAttr(row: number, column: number, attr: keyof CellAttributes): unknown;
        cell(row: number, column: number, text?: string | number): void;
        insertRow(rowIndex: number, items: Array<string | number>): void;
        insertColumn(columnIndex: number, items: Array<string | number>): void;
        removeCell(row: number, column: number): void;
        removeRow(row: number, n?: number): void;
        removeColumn(column: number, n?: number): void;
        push(...items: Array<string | number>[]): void;
        output(): string;
        toString(): string;
        readonly cols: number;
        readonly rows: number;
    }

    export = Table;
}
