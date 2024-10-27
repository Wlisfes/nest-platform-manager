import { isNotEmpty } from 'class-validator'

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
export async function fetchHandler<T>(where: boolean | Function, scope: Omix<{ handler: Function; failure?: Function }>): Promise<T> {
    if (typeof where === 'function') {
        where = await where()
    }
    if (where) {
        return await scope.handler()
    } else {
        return (await scope.failure?.()) ?? undefined
    }
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

/**通用字段转换**/
export function fetchTreePattern<T extends Omix>(data: Array<T>) {
    return fetchTreeTransfor(data, {
        transform: list => fetchTreeChildren(list),
        pattern: item => ({
            key: item.id,
            value: item.id,
            label: item.name,
            children: item.children
        })
    })
}

/**移除空数据children字段**/
export function fetchTreeChildren<T extends Omix>(data: Array<T>) {
    data.forEach((node: T) => {
        if (node.children && node.children.length > 0) {
            return fetchTreeChildren(node.children)
        }
        return delete node.children
    })
    return data
}

/**字段转换**/
export function fetchTreeTransfor<T extends Omix>(
    data: Array<T>,
    option: Omix<{ pattern: (e: Omix<T>) => Omix; transform?: (data: Array<T>) => Array<T> }>
) {
    function fetchTreeNode(item: Omix) {
        if (item.children && item.children.length > 0) {
            item.children = item.children.map((omix: Omix) => fetchTreeNode(omix))
        }
        return option.pattern(item as Omix<T>)
    }
    if (isNotEmpty(option.transform) && option.transform) {
        return option.transform(data.map(item => fetchTreeNode(item)) as Array<T>)
    }
    return data.map(item => fetchTreeNode(item)) as Array<T>
}

/**视口判断**/
export function fetchScreenResize(
    data: Partial<{ width: number; height: number }> = {}
): Omix<{ device: 'PC' | 'IPAD' | 'MOBILE'; collapsed: boolean }> {
    const width = data.width ?? window.innerWidth
    if (width > 1280) {
        return { device: 'PC', collapsed: false }
    } else if (width > 768) {
        return { device: 'IPAD', collapsed: true }
    }
    return { device: 'MOBILE', collapsed: true }
}
