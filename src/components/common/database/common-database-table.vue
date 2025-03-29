<script lang="tsx">
import { defineComponent, computed, PropType } from 'vue'
import { DataTableColumn, PaginationInfo } from 'naive-ui'
import { useVModels } from '@vueuse/core'
import { useState } from '@/hooks/hook-state'
import * as utils from '@/utils/utils-common'

export default defineComponent({
    name: 'CommonDatabaseTable',
    emits: ['update:page', 'update:size', 'update:columns'],
    props: {
        /**开启列设置**/
        settings: { type: Boolean, default: true },
        /**开启操列**/
        command: { type: Boolean, default: false },
        /**表格size**/
        elementSize: { type: String, default: 'medium' },
        /**开启分页**/
        pagination: { type: Boolean, default: false },
        /**分页数**/
        page: { type: Number, default: 1 },
        /**分页大小**/
        size: { type: Number, default: 20 },
        /**总条数**/
        total: { type: Number, default: 0 },
        /**表头配置**/
        columns: { type: Array as PropType<Array<DataTableColumn>>, default: () => [] },
        /**表数据列表**/
        data: { type: Array as PropType<Array<Omix>>, default: () => [] },
        /**分页跳转**/
        showQuickJumper: { type: Boolean, default: false },
        /**分页条数列表**/
        showSizePicker: { type: Boolean, default: true }
    },
    setup(props, { slots }) {
        const { columns, page, size, total } = useVModels(props)
        const { state, setState } = useState({
            columns: [
                { title: '操作', key: 'command', width: 100, align: 'center', colSpan: () => 2 },
                {
                    title: () => <common-element-chunk element="icon" icon-size={22} content="nest-settings"></common-element-chunk>,
                    key: 'settings',
                    width: 46
                }
            ]
        })

        const faseColumns = computed(() => fetchConcatColumns(columns.value))

        /**表头列合并**/
        function fetchConcatColumns(data: Array<DataTableColumn>) {
            const keysColumns: typeof data = [
                { title: '操作', key: 'command', width: 100, align: 'center', colSpan: () => 2 },
                {
                    title: () => <common-element-chunk element="icon" icon-size={22} content="nest-settings"></common-element-chunk>,
                    key: 'settings',
                    width: 46
                }
            ]
            return [...data].concat(keysColumns)
        }

        /**节点渲染**/
        function fetchColumnContentRender(value: any, data: Omix, base: Omix<DataTableColumn>) {
            if (utils.isNotEmpty(slots[base.key])) {
                if (['command'].includes(base.key)) {
                    return slots.command!(data, base)
                }
                return slots[base.key]!(value, data, base)
            } else if (slots.default) {
                return slots.default(value, data, base)
            } else if (utils.isEmpty(value)) {
                return <span>-</span>
            }
            return value
        }

        return () => (
            <n-data-table
                class="common-database-table"
                remote
                row-key={(row: Omix) => row.keyId}
                columns={faseColumns.value}
                size={props.elementSize}
                data={props.data}
                render-cell={fetchColumnContentRender}
                pagination={utils.fetchWhere<boolean | Omix>(!props.pagination, false, {
                    suffix: utils.fetchWhere(props.showQuickJumper, () => <span>页</span>),
                    goto: () => <span>前往</span>,
                    prefix: () => <span>{`共 ${total.value} 条`}</span>,
                    label: (data: Omix<{ node: number; active: boolean }>) => (
                        <n-button size="small" secondary type={data.active ? 'primary' : undefined}>
                            {data.node}
                        </n-button>
                    ),
                    prev: (data: Omix<PaginationInfo>) => (
                        <n-button size="small" secondary disabled={data.page <= 1}>
                            上一页
                        </n-button>
                    ),
                    next: (data: Omix<PaginationInfo>) => (
                        <n-button size="small" secondary disabled={data.page >= data.pageCount}>
                            下一页
                        </n-button>
                    ),
                    showQuickJumper: props.showQuickJumper,
                    showSizePicker: props.showSizePicker,
                    itemCount: total.value,
                    page: page.value,
                    pageSize: size.value,
                    pageSizes: [10, 20, 30, 50, 100],
                    onChange: (value: number) => (page.value = value),
                    onUpdatePageSize: (value: number) => (size.value = value)
                })}
            ></n-data-table>
        )
    }
})
</script>

<style lang="scss" scoped>
.n-data-table.common-database-table {
    :deep(.n-data-table-td.n-data-table-td--last-row) {
        border-bottom-width: 1px;
    }
    :deep(.n-data-table__pagination .n-pagination-item) {
        border: none;
        padding: 0;
    }
}
</style>
