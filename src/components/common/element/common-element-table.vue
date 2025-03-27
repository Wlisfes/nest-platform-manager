<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { DataTableColumn } from 'naive-ui'
import { useCurrentElement } from '@vueuse/core'
import * as utils from '@/utils/utils-common'

export default defineComponent({
    name: 'CommonElementTable',
    props: {
        /**表头配置**/
        columns: { type: Array as PropType<Array<DataTableColumn>>, default: () => [] },
        /**表数据列表**/
        data: { type: Array as PropType<Array<Omix>>, default: () => [] }
    },
    setup(props, { slots }) {
        const element = useCurrentElement<HTMLElement>()

        /**节点渲染**/
        function fetchColumnContentRender(value: any, data: Omix, base: Omix<DataTableColumn>) {
            if (utils.isNotEmpty(slots[base.key])) {
                if (utils.isEmpty(value)) {
                    return <span>-</span>
                }
                return slots[base.key]?.(data, base)
            } else if (utils.isEmpty(value)) {
                return <span>-</span>
            }
            return value
        }

        return () => (
            <n-data-table
                class="common-element-table"
                row-key={(row: Omix) => row.keyId}
                columns={props.columns}
                data={props.data}
                render-cell={fetchColumnContentRender}
            ></n-data-table>
        )
    }
})
</script>
