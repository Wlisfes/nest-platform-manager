import { createComponent, PropsState } from '@/utils'

/**新增、编辑菜单/按钮**/
export async function fetchDeploySystemSheet(props: PropsState<Omix>) {
    return await import('@/components/deploy/system/feedback/deploy-system-feedback-sheet.vue').then(component => {
        return createComponent(component.default, props)
    })
}

/**新增、编辑角色**/
export async function fetchDeploySystemFeedbackRole(props: PropsState<Omix>) {
    return await import('@/components/deploy/system/feedback/deploy-system-feedback-role.vue').then(component => {
        return createComponent(component.default, props)
    })
}

/**新增、编辑部门**/
export async function fetchDeploySystemFeedbackDept(props: PropsState<Omix>) {
    return await import('@/components/deploy/system/feedback/deploy-system-feedback-dept.vue').then(component => {
        return createComponent(component.default, props)
    })
}

/**部门关联用户**/
export async function fetchDeploySystemFeedbackDeptUser(props: PropsState<Omix>) {
    return await import('@/components/deploy/system/feedback/deploy-system-feedback-dept-user.vue').then(component => {
        return createComponent(component.default, props)
    })
}

/**角色关联员工**/
export async function fetchDeploySystemFeedbackRoleUser(props: PropsState<Omix>) {
    return await import('@/components/deploy/system/feedback/deploy-system-feedback-role-user.vue').then(component => {
        return createComponent(component.default, props)
    })
}
