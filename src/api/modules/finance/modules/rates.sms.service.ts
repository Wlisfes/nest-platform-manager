import { request } from '@/utils'

/**基础价格管理**/
export const httpBaseFinanceCreateBasicSmsRate = (data: Omix) => {
    return request({ url: '/api/windows/finance/rates/sms/create', method: 'POST', data })
}

export const httpBaseFinanceUpdateBasicSmsRate = (data: Omix) => {
    return request({ url: '/api/windows/finance/rates/sms/update', method: 'POST', data })
}

export const httpBaseFinanceUpdateBasicSmsRateStatus = (data: Omix) => {
    return request({ url: '/api/windows/finance/rates/sms/update/status', method: 'POST', data })
}

export const httpBaseFinanceColumnBasicSmsRate = (data: Omix) => {
    return request({ url: '/api/windows/finance/rates/sms/column', method: 'POST', data })
}
