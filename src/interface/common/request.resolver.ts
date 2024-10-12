export interface NoticeResolver {
    message: string
}

export interface RestResolver<T = Omix> extends NoticeResolver {
    data: T
    code: number
    timestamp: string
    method: string
    url: string
}

export interface RestColumn<T = Omix> extends NoticeResolver {
    page: number
    size: number
    total: number
    list: Array<T>
}
