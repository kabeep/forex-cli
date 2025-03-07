import fs from 'node:fs';

function readFileSync<T>(filepath: string) {
    const result = fs.readFileSync(filepath, { encoding: 'utf8' });

    try {
        return JSON.parse(result) as T;
    } catch {
        return result as T;
    }
}

export default readFileSync;
