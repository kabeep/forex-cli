import palette from '../palette';

function useDuration(timestamp?: number | Date) {
    const startTimestamp = Number(timestamp) || Date.now();

    return () => palette.grey(`${Date.now() - startTimestamp}ms`);
}

export default useDuration;
