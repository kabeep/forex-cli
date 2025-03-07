import createPalette from './_internal/create-palette';

const colorful = (code: number) => createPalette(code, 39);

const palette = Object.assign(
    (open: number, close: number) => createPalette(open, close),
    {
        dim: createPalette(2, 22),
        black: colorful(30),
        red: colorful(31),
        green: colorful(32),
        yellow: colorful(33),
        blue: colorful(34),
        magenta: colorful(35),
        cyan: colorful(36),
        white: colorful(37),
        grey: colorful(90),
    },
);

export default palette;
