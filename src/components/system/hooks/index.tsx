import { createComponent, CompProps } from '@/utils/utils-component'

/**新增、编辑菜单**/
export async function fetchDialogSystemRouter<T>(props: CompProps<T>) {
    return await import('@/components/system/src/basic/system-dialog-basic-router.vue').then(async component => {
        return await createComponent(component.default, props)
    })
}
