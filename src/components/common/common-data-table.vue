<script lang="tsx">
import { defineComponent, computed, PropType } from 'vue'
import { DataTableColumn } from 'naive-ui'
import { isEmpty } from 'class-validator'

export default defineComponent({
    name: 'CommonDataTable',
    props: {
        columns: { type: Array as PropType<Array<DataTableColumn>>, default: () => [] },
        data: { type: Array as PropType<Array<Omix>>, default: () => [] }
    },
    setup(props, { slots }) {
        const dataColumns = computed<Array<DataTableColumn>>(() => {
            return props.columns.map(data => ({
                ...data,
                ellipsis: data.ellipsis ?? {
                    tooltip: {
                        scrollable: true,
                        contentClass: 'max-w-540 max-h-450'
                    }
                },
                ellipsisComponent: data.ellipsisComponent ?? 'performant-ellipsis'
            }))
        })

        /**节点渲染**/
        function fetchRender(value: any, data: Omix, base: Omix<DataTableColumn>) {
            if (isEmpty(value)) {
                return <span>-</span>
            } else if (slots[base.key]) {
                return slots[base.key]!(data)
            }
            return <span>{value}</span>
        }

        return () => (
            <n-data-table
                class="flex-1"
                row-key={(row: Omix) => row.keyId}
                columns={dataColumns.value}
                data={props.data}
                render-cell={fetchRender}
            ></n-data-table>
        )
    }
})
</script>
