function createPalette(open: number, close: number) {
    return (text: string) => `\u001B[${open}m${text}\u001B[${close}m`;
}

export default createPalette;
