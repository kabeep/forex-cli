import createPalette from './craete-palette';

function useDuration(timestamp?: number | Date) {
    const startTimestamp = Number(timestamp) || Date.now();

    return () => createPalette(90)(`${Date.now() - startTimestamp}ms`);
}

export default useDuration;
