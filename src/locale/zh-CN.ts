export default {
    CMD_USAGE: '$0 [选项] <金额>',

    CMD_OPTION_FROM: '基准货币代码或区域代码',
    CMD_OPTION_TO: '目标货币代码或区域代码',
    CMD_OPTION_DATE: '指定汇率的日期，或最新的 "latest"',
    CMD_OPTION_TIMEOUT: '请求超时时间 (毫秒)',

    CMD_USAGE_EG: '指定基准货币和目标货币',
    CMD_USAGE_EG_AUTO: '指定其一币种，通过终端区域设置自动填入另一币种',
    CMD_USAGE_EG_CURRENCY: '使用 ISO 4217 的货币代码',
    CMD_USAGE_EG_LOCALE: '使用 ISO 3166-1 的区域代码',
    CMD_USAGE_EG_DATE: '使用指定日期的汇率',
    CMD_USAGE_EG_TIMEOUT: '设置请求超时时间',

    CMD_ERR_UNKNOWN: '未知异常，若重复出现请通过 https://github.com/kabeep/forex-cli/issues 提交 issue',
    CMD_ERR_UNMEANING: '无意义的货币组，请输入不同的货币代码',
    CMD_ERR_INVALID_DATE: '无效的日期，请检查 --date 参数',
    CMD_ERR_TIMEOUT_CURRENCIES: '请求可用货币列表超时',
    CMD_ERR_INVALID_CURRENCIES: '指定日期的可用货币列表为空',
    CMD_ERR_INVALID_FROM: '无效的基准货币或区域代码',
    CMD_ERR_INVALID_TO: '无效的目标货币或区域代码',
    CMD_ERR_TIMEOUT_RATE: '请求货币汇率超时',
    CMD_ERR_INVALID_RATE: '在指定日期不受支持的货币代码',
    CMD_ERR_TIMEOUT_CONVERT: '请求兑换金额超时',
    CMD_ERR_INVALID_CONVERT: '在指定日期不受支持的货币代码',
};
