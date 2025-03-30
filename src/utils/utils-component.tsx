import { createApp, createVNode, nextTick, App } from 'vue'
import { setupStore } from '@/store'
import * as utils from '@/utils/utils-common'

export interface EventComponent extends Omix {
    mounte: () => Promise<Omix<any>>
    unmount: (delay?: number) => Promise<Omix<any>>
}

export interface RestComponent extends EventComponent {
    element: HTMLElement
    app: App<Element>
}

export type CompProps<T> = Omix<T> & {
    onClose?: (e: Omix<EventComponent>) => void | any | Promise<any>
    onSubmit?: (e: Omix<EventComponent>) => void | any | Promise<any>
}

/**创建组件实例**/
export async function createComponent<T extends Omix>(Component: Parameters<typeof createApp>['0'], props: T): Promise<RestComponent> {
    const element = document.createElement('div')
    const app = createApp(<layout-config-provider>{createVNode(Component, { ...props, onSubmit, onClose })}</layout-config-provider>)

    /**组件挂载**/
    async function mounte(): Promise<any> {
        return app.mount(element, true)
    }

    /**组件销毁**/
    async function unmount(delay: number = 300): Promise<any> {
        return await utils.fetchDelay(delay, async () => {
            app.unmount()
            return element.remove()
        })
    }

    /**组件关闭事件**/
    async function onClose(scope: Omix) {
        if (utils.isEmpty(props.onClose)) return await unmount()
        return await props.onClose!({ ...scope, unmount })
    }

    /**组件提交表单事件**/
    async function onSubmit(scope: Omix) {
        return await utils.fetchHandler(Boolean(props.onSubmit), async () => {
            return props.onSubmit!({ ...scope, unmount })
        })
    }

    setupStore(app)
    nextTick(async () => {
        await mounte()
    })

    return { element, app, mounte, unmount }
}

/**异步返回VNode**/
export function fetchRender(Component: Parameters<typeof createApp>['0']) {
    return () => createVNode(Component)
}

// /**通知弹窗二次封装**/
// export function fetchNotice(
//     option: Omit<NotificationOptions, 'onLeave' | 'onClose' | 'onAfterLeave' | 'onAfterEnter'> & {
//         duration?: number
//         type?: NotificationOptions['type']
//         onAfterEnter?: (x: NotificationReactive) => void | any | undefined
//         onAfterLeave?: (x: NotificationReactive) => void | any | undefined
//         onClose?: (x: NotificationReactive) => boolean | Promise<boolean>
//         onLeave?: (x: NotificationReactive) => void | any | undefined
//     }
// ): Promise<NotificationReactive> {
//     return new Promise(resolve => {
//         const vm = window.$notification.create({
//             ...option,
//             type: option.type ?? 'success',
//             duration: option.duration ?? 2500,
//             keepAliveOnHover: option.keepAliveOnHover ?? true,
//             onAfterEnter: ((e: HTMLElement) => {
//                 return option.onAfterEnter ? option.onAfterEnter(vm) : undefined
//             }) as NotificationOptions['onAfterEnter'],
//             onAfterLeave: () => {
//                 return option.onAfterLeave ? option.onAfterLeave(vm) : undefined
//             },
//             onClose: () => {
//                 return option.onClose ? option.onClose(vm) : true
//             },
//             onLeave: () => {
//                 return option.onLeave ? option.onLeave(vm) : undefined
//             }
//         })
//         resolve(vm)
//     })
// }
