import { createComponent, Props } from '@/utils/utils-component'

/**新增、编辑菜单**/
export async function fetchDialogSystemMenu<T>(props: Props<T>) {
    return await import('@/components/system/src/basic/system-dialog-basic-menu.vue').then(async component => {
        return await createComponent(component.default, props)
    })
}
