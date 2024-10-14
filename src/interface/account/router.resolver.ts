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
