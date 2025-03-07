import fs from 'node:fs';

function pathExist(filepath: string) {
    try {
        fs.accessSync(filepath, fs.constants.R_OK);
        return true;
    } catch {
        return false;
    }
}

export default pathExist;
