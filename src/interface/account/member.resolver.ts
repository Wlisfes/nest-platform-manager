/**员工账号登录-入参**/
export interface BodyAuthMember extends Omix {
    jobNumber: string
    password: string
    code: string
}
/**员工账号登录-出参**/
export interface RestAuthMember extends Omix {
    expires: number
    token: string
    secret: string
}
