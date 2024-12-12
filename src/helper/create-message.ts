function createMessage(
    baseName: string,
    baseCode: string,
    destName: string,
    destCode: string,
) {
    return (source: string | number, result?: string | number) => {
        return result
            ? `${source} ${baseName} (${baseCode}) ≈ ${result} ${destName} (${destCode})`
            : `${baseName} (${baseCode}) -> ${destName} (${destCode}) ≈ ${source}`;
    };
}

export default createMessage;
