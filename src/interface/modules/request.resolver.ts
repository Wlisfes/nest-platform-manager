export type NoticeResolver = Omix & {
    message: string
}

export type ResultResolver<T = Omix> = NoticeResolver & {
    data: T
    code: number
    timestamp: string
    method: string
    url: string
}

export type BodyColumn<T = Omix> = Omix<T> & {
    page?: number
    size?: number
    vague?: string
}

export type ResultColumn<T = Omix> = NoticeResolver & {
    page: number
    size: number
    total: number
    list: Array<T>
}
