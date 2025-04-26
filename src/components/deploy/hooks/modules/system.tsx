import { createComponent, PropsState } from '@/utils/utils-component'

/**新增、编辑菜单权限**/
export async function fetchDeploySystemFeedbackRouter(props: PropsState<Omix>) {
    return await import('@/components/deploy/system/feedback/deploy-system-feedback-router.vue').then(component => {
        return createComponent(component.default, props)
    })
}

/**新增、编辑角色**/
export async function fetchDeploySystemFeedbackRole(props: PropsState<Omix>) {
    return await import('@/components/deploy/system/feedback/deploy-system-feedback-role.vue').then(component => {
        return createComponent(component.default, props)
    })
}

/**角色关联用户**/
export async function fetchDeploySystemFeedbackRoleUser(props: PropsState<Omix>) {
    return await import('@/components/deploy/system/feedback/deploy-system-feedback-role-user.vue').then(component => {
        return createComponent(component.default, props)
    })
}
