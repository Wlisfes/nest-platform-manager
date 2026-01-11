<script lang="tsx">
import { defineComponent, inject, ref, computed, nextTick, PropType } from 'vue'
import { fetchWherer, isNotEmpty, isEmpty } from '@/utils'
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
        'update:checked'
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
        showSizePicker: { type: Boolean, default: true }
    },
    setup(props, { emit, slots }) {
        const headerRef = ref<Omix<{ $el: HTMLElement }>>()
        const tableRef = ref<HTMLElement>()
        const faseWhen = inject('COMMON_DATABASE_FASEWHEN', ref({ when: true, delay: 0, min: 60, max: 60 }))
        const { columns, data, page, size, total, loading, items } = useVModels(props)
        /**表格配置**/
        const tableNode = computed(() => ({
            columns: columns.value.filter(item => item.check),
            style: fetchWherer(['fill-table'].includes(props.clientMode), { flex: 1 }, {})
        }))
        /**弹性高度**/
        const tableHeight = computed(() => {
            /**页面头部偏移量**/
            const pag = fetchWherer(props.pagination, 28 + props.limit, 0)
            /**表格头部移量**/
            const n = fetchWherer(isNotEmpty(headerRef.value), Math.ceil(headerRef.value?.$el?.clientHeight ?? 0), 0)
            /**搜索栏头移量部**/
            const w = fetchWherer(faseWhen.value.when, faseWhen.value.max, faseWhen.value.min)
            if (['fill-table'].includes(props.clientMode)) {
                console.log(n)
                if (faseWhen.value.when && faseWhen.value.delay > 0) {
                    return Math.floor(window.innerHeight - props.offset - n - (pag + 2) - faseWhen.value.min - props.limit * 5)
                }
                return Math.floor(window.innerHeight - props.offset - n - (pag + 2) - w - props.limit * 5)
            } else if (['full-table'].includes(props.clientMode)) {
                return Math.floor(window.innerHeight - pag - props.offset - props.limit * 4)
            }
            return faseWhen.value.max
        })
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

        // return () => (
        //     <n-data-table
        //         class="common-database-table"
        //         row-key={(row: Omix) => row.keyId}
        //         columns={faseColumns.value}
        //         size={configer.elementSize}
        //         flex-height={props.flexHeight}
        //         remote={props.remote}
        //         data={props.data}
        //         scroll-x={width.value}
        //         checked-row-keys={rowKeys.value}
        //         default-checked-row-keys={rowKeys.value}
        //         render-cell={fetchColumnContentRender}
        //         on-update:checked-row-keys={fetchUpdateChecked}
        //         render-expand-icon={() => <common-element-icon size={18} name="nest-double-right"></common-element-icon>}
        //         pagination={utils.fetchWhere<boolean | Omix>(!props.pagination, false, {
        //             suffix: utils.fetchWhere(props.showQuickJumper, () => <span>页</span>),
        //             goto: () => <span>前往</span>,
        //             prefix: () => <span>{`共 ${total.value} 条`}</span>,
        //             label: (data: Omix<{ node: number; active: boolean }>) => (
        //                 <common-element-button size="small" secondary type={data.active ? 'primary' : undefined}>
        //                     {data.node}
        //                 </common-element-button>
        //             ),
        //             prev: (data: Omix<PaginationInfo>) => (
        //                 <common-element-button size="small" secondary disabled={data.page <= 1}>
        //                     上一页
        //                 </common-element-button>
        //             ),
        //             next: (data: Omix<PaginationInfo>) => (
        //                 <common-element-button size="small" secondary disabled={data.page >= data.pageCount}>
        //                     下一页
        //                 </common-element-button>
        //             ),
        //             showQuickJumper: props.showQuickJumper,
        //             showSizePicker: props.showSizePicker,
        //             itemCount: total.value,
        //             page: page.value,
        //             pageSize: size.value,
        //             pageSizes: [10, 20, 30, 50, 100],
        //             onChange: (value: number) => (page.value = value),
        //             onUpdatePageSize: (value: number) => (size.value = value)
        //         })}
        //     ></n-data-table>
        // )
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
<!-- <style lang="scss" scoped>
.n-data-table.common-database-table {
    :deep(.n-data-table-tbody .n-data-table-td):has(.n-data-table-expand-trigger),
    :deep(.n-data-table-tbody .n-data-table-td):has(.n-data-table-expand-placeholder) {
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        padding-left: calc(var(--n-td-padding) + 24px);
        > .n-data-table-expand-trigger,
        > .n-data-table-expand-placeholder {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            margin: 0;
            left: calc(var(--n-td-padding) * var(--indent-offset) + var(--n-td-padding));
        }
        .n-data-table-indent {
            float: left;
        }
    }
    :deep(.n-data-table-td.n-data-table-td--center-align) > .common-database-chunk {
        justify-content: center;
    }
    :deep(.n-data-table__pagination .n-pagination-item) {
        border: none;
        padding: 0;
    }
}
</style> -->
