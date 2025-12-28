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
    CHUNK_WINDOWS_RESOUREC_STATUS: {
        value: 'CHUNK_WINDOWS_RESOUREC_STATUS',
        name: '菜单状态'
    },
    CHUNK_WINDOWS_RESOUREC_CHECK: {
        value: 'CHUNK_WINDOWS_RESOUREC_STATUS',
        name: '菜单显示状态'
    }
}
