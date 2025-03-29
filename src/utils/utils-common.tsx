import { VNode } from 'vue'
import { cloneDeep, concat, omit, pick } from 'lodash-es'
import { isNotEmpty, isEmpty, isArray, isEmail } from 'class-validator'
import dayjs from 'dayjs'
export { cloneDeep, concat, omit, pick, isNotEmpty, isEmpty, isArray, isEmail }

/**图标示例对象**/
export const modules: Record<string, VNode> = import.meta.glob(`@/assets/icons/*.svg`, { query: '?component', eager: true })
export const iconNames = Object.keys(modules).reduce((icons: typeof modules, next) => {
    icons[next.match(/([^/]+)\.svg$/)?.[1] as string] = modules[next] as never as VNode
    return icons
}, {})

/**dayjs实例**/
export const moment = dayjs

export function prevent(evt: Event, handler?: Function) {
    evt.preventDefault()
    return handler?.(evt)
}

export async function stop(evt: Event, handler?: Function) {
    evt.preventDefault()
    evt.stopPropagation()
    if (handler && typeof handler === 'function') {
        return await handler(evt)
    }
    return evt
}

/**回车事件**/
export function enter(e: KeyboardEvent, handler?: Function) {
    if (e.key === 'Enter') {
        typeof handler === 'function' && handler()
    }
}

/**根据条件返回不同参数**/
export function fetchWhere<T>(where: boolean, value: T, defaultValue?: T): T {
    return (where ? value : defaultValue) as T
}

/**延时方法**/
export function fetchDelay(delay = 100, handler?: Function) {
    return new Promise(resolve => {
        const timeout = setTimeout(() => {
            handler?.()
            resolve(undefined)
            clearTimeout(timeout)
        }, delay)
    })
}

/**条件函数执行**/
export async function fetchHandler<T>(where: boolean | Function, scope: Omix<{ handler: Function; feedback?: Function }>): Promise<T> {
    if (typeof where === 'function') {
        where = await where()
    }
    if (where) {
        return await scope.handler()
    } else {
        return (await scope.feedback?.()) ?? undefined
    }
}

/**对象排除空字段**/
export function fetchExclude(data: Omix) {
    return Object.keys(data).reduce((merge: Omix, key: string) => {
        if (isNotEmpty(data[key]) && !(isArray(data[key]) && data[key].length === 0)) {
            /**字段不能为空、不能为空数组**/
            merge[key] = data[key]
        }
        return merge
    }, {})
}

/**参数组合函数**/
export async function fetchParameter<T>(data: T) {
    return data
}

/**字节转换文字输出**/
export function fetchByte(byte: number, dec: number = 2) {
    if (byte === 0) return 'Byte'
    const k = 1024
    const dm = dec < 0 ? 0 : dec
    const sizes = ['Byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(byte) / Math.log(k))
    return parseFloat((byte / Math.pow(k, i)).toFixed(dm)) + sizes[i]
}

/**视口判断**/
export function fetchScreenResize(
    data: Partial<{ width: number; height: number }> = {}
): Omix<{ device: 'PC' | 'IPAD' | 'MOBILE'; collapsed: boolean }> {
    const width = data.width ?? window.innerWidth
    if (width > 1280) {
        return { device: 'PC', collapsed: false }
    } else if (width > 860) {
        return { device: 'IPAD', collapsed: true }
    }
    return { device: 'MOBILE', collapsed: true }
}
