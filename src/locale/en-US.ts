export default {
    CMD_USAGE: '$0 [options] <amount>',

    CMD_OPTION_FROM: 'The base currency code or locale code',
    CMD_OPTION_TO: 'The destination currency code or locale code',
    CMD_OPTION_DATE: 'The date for the conversion rate, or "latest" for the most recent',
    CMD_OPTION_TIMEOUT: 'Request timeout (milliseconds)',

    CMD_USAGE_EG: 'Specify base and target currencies',
    CMD_USAGE_EG_AUTO: 'Specify one of the currencies and automatically fill in the other currency through the terminal area settings',
    CMD_USAGE_EG_CURRENCY: 'Currency codes using ISO 4217',
    CMD_USAGE_EG_LOCALE: 'Use locale codes from ISO 3166-1',
    CMD_USAGE_EG_DATE: 'Use the exchange rate for the specified date',
    CMD_USAGE_EG_TIMEOUT: 'Set request timeout',

    CMD_ERR_UNKNOWN: 'Unknown Error: If it occurs repeatedly, please submit an issue in https://github.com/kabeep/forex-cli/issues',
    CMD_ERR_UNMEANING: 'Meaningless currency group, please enter a different currency code',
    CMD_ERR_INVALID_DATE: 'Invalid date, please check --date parameter',
    CMD_ERR_TIMEOUT_CURRENCIES: 'Request for list of available currencies timed out',
    CMD_ERR_INVALID_CURRENCIES: 'The list of available currencies for the specified date is empty',
    CMD_ERR_INVALID_FROM: 'Invalid base currency or locale code',
    CMD_ERR_INVALID_TO: 'Invalid target currency or locale code',
    CMD_ERR_TIMEOUT_RATE: 'Request currency exchange rate timed out',
    CMD_ERR_INVALID_RATE: 'Currency code that is not supported by the specified date',
    CMD_ERR_TIMEOUT_CONVERT: 'Request for exchange amount timed out',
    CMD_ERR_INVALID_CONVERT: 'Unsupported currency code on the specified date',
};