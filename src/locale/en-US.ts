export default {
    CMD_USAGE: '$0 <command> [options]',

    CMD_CONVERT_USAGE: 'Convert currency amounts',
    CMD_CONVERT_USAGE_EG: 'Convert 1000 USD to Euros',
    CMD_CONVERT_USAGE_EG_SPECIFIC: 'Specify base and target currencies',
    CMD_CONVERT_USAGE_EG_AUTO: 'Specify one of the currencies and automatically fill in the other currency through the OS\'s locale',
    CMD_CONVERT_USAGE_EG_CURRENCY: 'Currency codes using ISO 4217',
    CMD_CONVERT_USAGE_EG_LOCALE: 'Use locale codes from ISO 3166-1',
    CMD_CONVERT_USAGE_EG_COUNTRY: 'Use country or region name',

    CMD_CURRENCY_USAGE: 'Get available currency codes and names',
    CMD_CURRENCY_USAGE_EG_CODE: 'Obtained via ISO-3166-1-alpha-2 region code',
    CMD_CURRENCY_USAGE_EG_CURRENCY: 'Obtained via ISO 4217 currency code',
    CMD_CURRENCY_USAGE_EG_COUNTRY: 'Get by country or region name',

    CMD_LIST_USAGE: 'Print list of available currencies',
    CMD_LIST_USAGE_EG_LATEST: 'Shows the latest list of available currencies',
    CMD_LIST_USAGE_EG_PRETTY: 'Use unicode table to prettier printed content',

    CMD_OPTION_DATE: 'The date for the conversion rate, or "latest" for the most recent',
    CMD_OPTION_TIMEOUT: 'Request timeout (milliseconds)',
    CMD_OPTION_CLIPBOARD: 'Write (copy) the result to the clipboard',
    CMD_OPTION_TRANSLATE: 'Translate occurrences of currency or region names',
    CMD_OPTION_VERBOSE: 'Output verbose messages on internal operations',
    CMD_OPTION_FROM: 'The base currency code or locale code',
    CMD_OPTION_TO: 'The destination currency code or locale code',
    CMD_OPTION_PRETTY: 'Pretty output format',

    CMD_OPTION_USAGE_EG_DATE: 'Use the exchange rate for the specified date',
    CMD_OPTION_USAGE_EG_TIMEOUT: 'Set request timeout',
    CMD_OPTION_USAGE_EG_TRANSLATE: 'Print the translated currency name or region name according to the operating system locale',

    CMD_MSG_CHOICE_COUNTRY: 'Please select a country or region',
    CMD_MSG_CONFIRM_COUNTRY: 'Did you mean {{region}}?',
    CMD_MSG_FETCH_CURRENCIES: 'Get the list of available currencies on {{date}} {{time}}',
    CMD_MSG_FETCH_TRANSLATION: 'Get currency name translation (via Google) {{time}}',
    CMD_MSG_FETCH_RATE: 'Get the currency exchange rate between {{base}} and {{dest}} on {{date}} {{time}}',

    CMD_ERR_UNKNOWN: 'Unknown Error: If it occurs repeatedly, please submit an issue in https://github.com/kabeep/forex-cli/issues',
    CMD_ERR_UNMEANING: 'Meaningless currency group, please enter a different currency code',
    CMD_ERR_INVALID_DATE: 'Invalid date, please check --date parameter',
    CMD_ERR_INVALID_AMOUNT: '"{{amount}}" is not a valid amount. Please enter a valid amount, such as "1000", "1,000", "1e3" or "1k"',
    CMD_ERR_TIMEOUT_CURRENCIES: 'Request for list of available currencies timed out',
    CMD_ERR_CLIPBOARD_WRITE: 'Clipboard writing failed',
    CMD_ERR_INVALID_CURRENCIES: 'The list of available currencies for the specified date is empty',
    CMD_ERR_INVALID_FROM: 'Invalid base currency or locale code',
    CMD_ERR_INVALID_TO: 'Invalid target currency or locale code',
    CMD_ERR_TIMEOUT_RATE: 'Request currency exchange rate timed out',
    CMD_ERR_INVALID_RATE: 'Currency code that is not available on the specified date',
    CMD_ERR_TIMEOUT_CONVERT: 'Request for exchange amount timed out',
    CMD_ERR_INVALID_CONVERT: 'Unsupported currency code on the specified date',
    CMD_ERR_INVALID_COUNTRY: 'Country or region names not yet supported',
    CMD_ERR_USER_CANCEL: 'User actively cancels',
};
