import { VNode } from 'vue'
import { DialogOptions, DialogReactive, NotificationOptions, NotificationReactive } from 'naive-ui'
import * as utils from '@/utils/utils-common'

export interface BaseDialogReactiveOption extends Omix {
    type?: 'error' | 'success' | 'warning'
    draggable?: boolean
    showIcon?: boolean
    autoFocus?: boolean
    maskClosable?: boolean
    title?: string | VNode
}

/**对话弹窗二次封装**/
export async function fetchDialogReactive(opts: BaseDialogReactiveOption): Promise<DialogReactive> {
    const isTitle = utils.isNotEmpty(opts.title)
    return window.$dialog.create({
        type: opts.type,
        draggable: opts.draggable ?? true,
        showIcon: isTitle ? opts.showIcon ?? true : false,
        autoFocus: opts.autoFocus ?? false,
        maskClosable: opts.maskClosable ?? false,
        title: () => <div>dasdas </div>,
        content: '你确定你确定你确定你确定你确定你确定你确定你确定你确定你确定你确定你确定你确定你确定你确定你确定你确定',
        positiveText: '确定',
        negativeText: '不确定',
        titleClass: `text-18 line-height-28 gap-8 ${opts.titleClass ?? ''}`,
        contentClass: `text-18 line-height-24 ${opts.contentClass ?? ''}`,
        style: {
            '--n-padding': '20px',
            '--n-close-margin': '16px 16px 0 0',
            '--n-icon-margin': '0',
            '--n-content-margin': isTitle ? '12px 0 16px' : '0px 28px 16px 0',
            display: 'flex',
            flexDirection: 'column'
        },
        /**取消按钮事件**/
        onNegativeClick: (event: MouseEvent) => {
            console.log(event)
        },
        /**确定按钮事件**/
        onPositiveClick: (event: MouseEvent) => {
            console.log(event)
        }
    } as never as DialogOptions)
}
