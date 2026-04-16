import { createComponent, PropsState } from '@/utils'

/**新增、编辑品牌**/
export async function fetchFinanceDeployBrand(props: PropsState<Omix>) {
    return await import('@/components/finance/feedback/finance-deploy-feedback-brand.vue').then(component => {
        return createComponent(component.default, props)
    })
}

/**新增、编辑客户**/
export async function fetchFinanceAccountConsumer(props: PropsState<Omix>) {
    return await import('@/components/finance/feedback/finance-account-feedback-consumer.vue').then(component => {
        return createComponent(component.default, props)
    })
}
