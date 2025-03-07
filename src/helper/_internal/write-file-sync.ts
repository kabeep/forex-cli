import fs from 'node:fs';

function writeFileSync(filepath: string, content: unknown) {
    try {
        fs.writeFileSync(filepath, JSON.stringify(content), 'utf8');
    } catch (err) {
        return err;
    }
}

export default writeFileSync;
