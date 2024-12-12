import translate, { type TranslationOption } from '@kabeep/node-translate';
import to from '../to';

const translateOptions = { from: 'en', timeout: 3_000 };

const translateAdapter = (translation: TranslationOption) =>
    translation?.to?.text?.value;

async function useTranslate<T extends string | string[]>(
    text: T,
    options = {},
) {
    const isMultiple: boolean = Array.isArray(text);
    if (!text || (isMultiple && !text.length)) return '';

    const sourceList: string[] = isMultiple
        ? (text as string[])
        : [text as string];

    const protection = '\n{%}\n';
    const compositeText: string = sourceList.join(protection);

    const [error, result] = await to(
        translate(compositeText, { ...translateOptions, ...options }),
    );
    if (error) return text;

    const translation = translateAdapter(result);
    const translationList = translation.split(protection);
    if (translationList.length !== sourceList.length) return text;

    return (
        isMultiple ? translationList : translationList[0] || text
    ) as T extends string ? string : string[];
}

export default useTranslate;
