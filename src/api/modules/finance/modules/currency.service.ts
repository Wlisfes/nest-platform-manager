import { request } from '@/utils'

/**币种分页列表**/
export function httpBaseFinanceColumnCurrency(data: Omix) {
    return request({
        url: `/api/windows/finance/currency/column`,
        method: 'POST',
        data
    })
}

/**币种状态修改**/
export function httpBaseFinanceUpdateCurrencyStatus(data: Omix) {
    return request({
        url: `/api/windows/finance/currency/update/status`,
        method: 'POST',
        data
    })
}
