function createPalette(code: number) {
    return (text: string | number) => `\u001B[${code}m${text}\u001B[39m`;
}

export default createPalette;
