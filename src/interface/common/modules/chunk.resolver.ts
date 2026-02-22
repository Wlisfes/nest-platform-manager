import { CSSProperties } from 'vue'
/**枚举类型**/
export type ChunkName = keyof typeof COMMON_CHUNK_OPTIONS
/**通用下拉字典类型**/
export interface ChunkCommonOptions<T> extends Record<ChunkName, T> {}
/**通用下拉字典列表类型**/
export interface ChunkColumnOptions extends Omix {
    keyId: number
    name: string
    value: string
    json: Omix<{ type: string; style: CSSProperties }>
}
/**通用下拉字典**/
export const COMMON_CHUNK_OPTIONS = {
    CHUNK_WINDOWS_ACCOUNT_STATUS: {
        value: 'CHUNK_WINDOWS_ACCOUNT_STATUS',
        name: '账号状态'
    },
    CHUNK_WINDOWS_SHEET_CHECK: {
        value: 'CHUNK_WINDOWS_SHEET_CHECK',
        name: '菜单显示状态'
    },
    CHUNK_WINDOWS_SHEET_CHUNK: {
        value: 'CHUNK_WINDOWS_SHEET_CHUNK',
        name: '菜单类型'
    },
    CHUNK_WINDOWS_SHEET_STATUS: {
        value: 'CHUNK_WINDOWS_SHEET_STATUS',
        name: '菜单状态'
    },
    CHUNK_WINDOWS_RESOUREC_STATUS: {
        value: 'CHUNK_WINDOWS_RESOUREC_STATUS',
        name: '菜单状态'
    },
    CHUNK_WINDOWS_RESOUREC_CHECK: {
        value: 'CHUNK_WINDOWS_RESOUREC_STATUS',
        name: '菜单显示状态'
    },
    COMMON_WINDOWS_RESOUREC_SHEET: {
        value: 'COMMON_WINDOWS_RESOUREC_SHEET',
        name: '按钮状态'
    },
    CHUNK_WINDOWS_ROLE_CHUNK: {
        value: 'CHUNK_WINDOWS_ROLE_CHUNK',
        name: '角色类型'
    },
    CHUNK_WINDOWS_ROLE_MODEL: {
        value: 'CHUNK_WINDOWS_ROLE_MODEL',
        name: '角色数据权限'
    }
}
