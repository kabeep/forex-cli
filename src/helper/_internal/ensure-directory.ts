import fs from 'node:fs';
import pathExist from './path-exist';

function ensureDirectory(directoryPath: string): Error | undefined {
    if (pathExist(directoryPath)) return;

    try {
        fs.mkdirSync(directoryPath, { recursive: true });
        return;
    } catch (err) {
        return err as Error;
    }
}

export default ensureDirectory;
