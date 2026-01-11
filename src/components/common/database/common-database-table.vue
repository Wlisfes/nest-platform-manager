<script lang="tsx">
import { defineComponent, ref, computed, nextTick, PropType } from 'vue'
import { fetchWherer, fetchMinusNumner, isNotEmpty, isEmpty } from '@/utils'
import { DataTableColumn, PaginationInfo } from 'naive-ui'
import { useVModels } from '@vueuse/core'

export default defineComponent({
    name: 'CommonDatabaseTable',
    emits: [
        'update:page',
        'update:size',
        'update:total',
        'update:loading',
        'update:columns',
        'update:data',
        'update:items',
        'update:checked',
        'update:faseWhen'
    ],
    props: {
        /**表格模式**/
        clientMode: { type: String as PropType<'fill-table' | 'full-table'>, default: 'fill-table' },
        /**高度偏移**/
        offset: { type: Number, default: 86 },
        /**边距值**/
        limit: { type: Number, default: 14 },
        /**分页数**/
        page: { type: Number, default: 1 },
        /**分页大小**/
        size: { type: Number, default: 50 },
        /**总条数**/
        total: { type: Number, default: 0 },
        /**加载状态**/
        loading: { type: Boolean, default: true },
        /**开启分页**/
        pagination: { type: Boolean, default: true },
        /**开启边框**/
        bordered: { type: Boolean, default: true },
        /**被选中的行的对象列表**/
        items: { type: Array as PropType<Array<Omix>>, default: () => [] },
        /**表头配置**/
        columns: { type: Array as PropType<Array<Omix<DataTableColumn>>>, default: () => [] },
        /**表数据列表**/
        data: { type: Array as PropType<Array<Omix>>, default: () => [] },
        /**分页跳转**/
        showQuickJumper: { type: Boolean, default: false },
        /**分页条数列表**/
        showSizePicker: { type: Boolean, default: true },
        /**表单边界配置**/
        faseWhen: { type: Object as PropType<Omix>, default: () => ({}) }
    },
    setup(props, { emit, slots }) {
        const headerRef = ref<Omix<{ $el: HTMLElement }>>()
        const tableRef = ref<HTMLElement>()
        const { columns, data, page, size, total, loading, items, faseWhen } = useVModels(props)
        /**表格配置**/
        const tableNode = computed(() => {
            return {
                columns: columns.value.filter(item => item.check),
                style: fetchWherer(['fill-table'].includes(props.clientMode), { flex: 1 }, { height: `${fetchBaseTableHeight()}px` })
            }
        })
        /**计算表格高度**/
        function fetchBaseTableHeight(): number {
            /**表格分页偏移量**/
            const pagination = fetchWherer(props.pagination, 28 + props.limit, 0)
            /**表格头部偏移量**/
            const header = fetchWherer(isNotEmpty(headerRef.value), Math.ceil(headerRef.value?.$el?.clientHeight ?? 0), 0)
            /**偏移量聚合**/
            const numbers = [props.offset, header, pagination, props.limit * 4]
            /**高度计算**/
            return numbers.reduce((max: number, h: number) => fetchMinusNumner(max, h), window.innerHeight)
        }
        /**选择列事件**/
        async function fetchCheckedUpdate(keys: Array<string>, data: Array<Omix>) {
            return await nextTick(() => (items.value = data)).then(() => {
                return emit('update:checked', items.value)
            })
        }
        /**节点渲染**/
        function fetchCellRender(value: any, data: Omix, base: Omix<DataTableColumn>) {
            if (isNotEmpty(slots[base.key])) {
                return slots[base.key]!(value, data, base)
            } else if (isEmpty(value)) {
                return <span>-</span>
            }
            return <n-ellipsis tooltip={{ scrollable: true, style: { maxWidth: '540px', maxHeight: '540px' } }}>{value}</n-ellipsis>
        }

        return () => (
            <n-element
                class="common-database-container flex flex-col flex-1 overflow-hidden"
                style={{ '--limit-width': `${props.limit}px`, padding: 'var(--limit-width)' }}
            >
                <n-card class="flex flex-col flex-1 b-rd-8 overflow-hidden" content-class="flex flex-col flex-1 overflow-hidden p-0!">
                    <n-element class="common-database-table flex flex-col flex-1 overflow-hidden">
                        {slots.default && (
                            <n-element ref={headerRef} class="flex flex-col line-height-22 overflow-hidden">
                                {slots.default && slots.default()}
                            </n-element>
                        )}
                        <div ref={tableRef} class="common-database-table-container flex flex-col flex-1 overflow-hidden">
                            <n-data-table
                                remote
                                flex-height
                                size="small"
                                row-key={(e: Omix) => e.keyId}
                                loading={loading.value}
                                scroll-x={0}
                                bordered={props.bordered}
                                data={data.value}
                                columns={tableNode.value.columns}
                                style={tableNode.value.style}
                                scrollbar-props={{ size: 100 }}
                                render-cell={fetchCellRender}
                                on-update:checked-row-keys={fetchCheckedUpdate}
                            ></n-data-table>
                        </div>
                    </n-element>
                    {props.pagination && (
                        <n-element class="common-database-pagination flex justify-end">
                            <n-pagination
                                page={page.value}
                                page-size={size.value}
                                item-count={total.value}
                                v-model:page={page.value}
                                page-sizes={[20, 30, 50, 100, 200, 300]}
                                show-size-picker={props.showSizePicker}
                                show-quick-jumper={props.showQuickJumper}
                                on-update:page={(value: number) => (page.value = value)}
                                on-update:page-size={(value: number) => (size.value = value)}
                            >
                                {{
                                    uffix: fetchWherer(props.showQuickJumper, () => <span>页</span>),
                                    goto: () => <span>前往</span>,
                                    prefix: () => <span class="whitespace-nowrap">{`共 ${total.value} 条`}</span>,
                                    label: (data: Omix<{ node: number; active: boolean }>) => (
                                        <common-element-button size="small" secondary type={data.active ? 'primary' : undefined}>
                                            {data.node}
                                        </common-element-button>
                                    ),
                                    prev: (data: Omix<PaginationInfo>) => (
                                        <common-element-button size="small" secondary disabled={data.page <= 1}>
                                            上一页
                                        </common-element-button>
                                    ),
                                    next: (data: Omix<PaginationInfo>) => (
                                        <common-element-button size="small" secondary disabled={data.page >= data.pageCount}>
                                            下一页
                                        </common-element-button>
                                    )
                                }}
                            </n-pagination>
                        </n-element>
                    )}
                </n-card>
            </n-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-database-container {
    position: relative;
    padding: v-bing(--limit);
    .n-element.common-database-table {
        padding: var(--limit-width);
        overflow: hidden;
        :deep(.n-data-table-loading-wrapper) {
            font-size: 48px;
        }
        :deep(.n-data-table-td):has(.n-data-table-expand-trigger) {
            display: flex;
            align-items: center;
        }
    }
    .n-element.common-database-pagination {
        transition: border-color 0.3s var(--n-bezier);
        padding: 0 var(--limit-width) var(--limit-width);
        overflow: hidden;
        :deep(.n-pagination > .n-pagination-item) {
            border: none;
            padding: 0;
        }
    }
}
</style>
