export default {
    CMD_USAGE: '$0 <命令> [选项]',

    CMD_CONVERT_USAGE: '转换货币金额',
    CMD_CONVERT_USAGE_EG: '将 1000 美元转换为欧元',
    CMD_CONVERT_USAGE_EG_SPECIFIC: '指定基准货币和目标货币',
    CMD_CONVERT_USAGE_EG_AUTO: '指定其一币种，通过操作系统语言环境自动填入另一币种',
    CMD_CONVERT_USAGE_EG_CURRENCY: '使用 ISO 4217 的货币代码',
    CMD_CONVERT_USAGE_EG_LOCALE: '使用 ISO 3166-1 的地区代码',
    CMD_CONVERT_USAGE_EG_COUNTRY: '使用国家或地区名称',

    CMD_CURRENCY_USAGE: '获取可用的货币代码和名称',
    CMD_CURRENCY_USAGE_EG_CODE: '通过 ISO-3166-1-alpha-2 地区代码获取',
    CMD_CURRENCY_USAGE_EG_CURRENCY: '通过 ISO 4217 货币代码获取',
    CMD_CURRENCY_USAGE_EG_COUNTRY: '通过国家或地区名称获取',

    CMD_LIST_USAGE: '展示可用货币列表',
    CMD_LIST_USAGE_EG_LATEST: '展示最新的可用货币列表',
    CMD_LIST_USAGE_EG_PRETTY: '使用 unicode 表格美化打印内容',

    CMD_OPTION_DATE: '指定汇率的日期，或最新的 "latest"',
    CMD_OPTION_TIMEOUT: '请求超时时间 (毫秒)',
    CMD_OPTION_CLIPBOARD: '写入 (复制) 结果到剪贴板',
    CMD_OPTION_TRANSLATE: '翻译出现的货币或地区名称',
    CMD_OPTION_VERBOSE: '输出程序内部执行的详细步骤信息',
    CMD_OPTION_FROM: '基准货币代码或区域代码',
    CMD_OPTION_TO: '目标货币代码或区域代码',
    CMD_OPTION_PRETTY: '美化输出格式',

    CMD_OPTION_USAGE_EG_DATE: '使用指定日期的汇率',
    CMD_OPTION_USAGE_EG_TIMEOUT: '设置请求超时时间',
    CMD_OPTION_USAGE_EG_TRANSLATE: '根据操作系统语言环境打印翻译后的货币名称或地区名称',

    CMD_MSG_CHOICE_COUNTRY: '请选择一个国家或地区',
    CMD_MSG_CONFIRM_COUNTRY: '您是指 {{region}} 吗？',
    CMD_MSG_FETCH_CURRENCIES: '获取 {{date}} 可用货币列表 {{time}}',
    CMD_MSG_FETCH_TRANSLATION: '获取货币名称翻译 (使用谷歌翻译，大陆网络信道暂不支持) {{time}}',
    CMD_MSG_FETCH_RATE: '获取 {{date}} 货币 {{base}} 与 {{dest}} 的汇率 {{time}}',

    CMD_ERR_UNKNOWN: '未知异常，若重复出现请通过 https://github.com/kabeep/forex-cli/issues 提交 issue',
    CMD_ERR_UNMEANING: '无意义的货币组，请输入不同的货币代码',
    CMD_ERR_INVALID_DATE: '无效的日期，请检查 --date 参数',
    CMD_ERR_INVALID_AMOUNT: '"{{amount}}" 不是有效金额, 请输入有效金额, 例如 "1000" 或 "1e3", 再比如 "101,001,001.01" 或 "1b1m1k1.01"',
    CMD_ERR_CREATE_CACHE_DIR: '无法创建缓存目录, 请检查 CLI 权限',
    CMD_ERR_WRITE_CACHE_FILE: '无法写入缓存文件, 请检查 CLI 权限',
    CMD_ERR_TIMEOUT_CURRENCIES: '请求可用货币列表超时',
    CMD_ERR_CLIPBOARD_WRITE: '写入剪贴板失败',
    CMD_ERR_INVALID_CURRENCIES: '指定日期的可用货币列表为空',
    CMD_ERR_INVALID_FROM: '无效的基准货币或区域代码',
    CMD_ERR_INVALID_TO: '无效的目标货币或区域代码',
    CMD_ERR_TIMEOUT_RATE: '获取货币汇率超时',
    CMD_ERR_INVALID_RATE: '在指定日期不可用的货币代码',
    CMD_ERR_TIMEOUT_CONVERT: '获取兑换金额超时',
    CMD_ERR_INVALID_CONVERT: '在指定日期不受可用的货币代码',
    CMD_ERR_INVALID_COUNTRY: '尚未支持用的国家或地区名称',
    CMD_ERR_USER_CANCEL: '用户主动取消',
};
