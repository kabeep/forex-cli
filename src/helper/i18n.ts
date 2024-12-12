import get from 'lodash.get';
import template from 'lodash.template';
import locale from '../locale';

class I18n {
    protected readonly dictionary: Record<string, string>;

    constructor(locale: Record<string, string>) {
        this.dictionary = locale;
        this.i18n = this.i18n.bind(this);
    }

    public i18n(path: string, variables?: Record<string, string>): string {
        const value = get(this.dictionary, path);

        if (typeof value === 'string') {
            return this.compiled(value, variables);
        }

        return path;
    }

    protected compiled(value: string, variables?: Record<string, string>) {
        if (variables) return this.compiler(value)(variables);
        return value;
    }

    private compiler(value: string) {
        return template(value, { interpolate: /{{([\s\S]+?)}}/g });
    }
}

const instance = new I18n(locale);

export default instance.i18n;
