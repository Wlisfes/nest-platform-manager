import { createComponent, PropsState } from '@/utils'

/**新增、编辑品牌**/
export async function fetchFinanceDeployBrand(props: PropsState<Omix>) {
    return await import('@/components/finance/feedback/finance-deploy-feedback-brand.vue').then(component => {
        return createComponent(component.default, props)
    })
}
