/**新增菜单-入参**/
export interface BodySaveRouter extends Omix {
    name: string
    instance: string
    show: boolean
    version: string
    sort: number
    state: string
    type: string
    sid?: string
    path?: string
    icon?: string
    pid?: string
    active?: string
}

/**所有菜单树-出参**/
export interface RestTreeRouter extends Omix {
    sid: string
    name: string
    pid: string
    type: string
    children: Array<RestTreeRouter>
}
