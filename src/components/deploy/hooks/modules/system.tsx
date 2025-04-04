import { createComponent, PropsState } from '@/utils/utils-component'

/**新增、编辑菜单权限**/
export async function fetchDeploySystemFeedbackRouter(props: PropsState<Omix>) {
    return await import('@/components/deploy/system/feedback/deploy-system-feedback-router.vue').then(component => {
        return createComponent(component.default, props)
    })
}
