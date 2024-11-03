<script lang="tsx">
import { defineComponent, onMounted, nextTick, PropType, computed } from 'vue'
import { DataTableColumn } from 'naive-ui'
import { useCurrentElement } from '@vueuse/core'
import { isEmpty } from 'class-validator'
import { useState } from '@/hooks/hook-state'

export default defineComponent({
    name: 'CommonDataTable',
    props: {
        columns: { type: Array as PropType<Array<DataTableColumn>>, default: () => [] },
        data: { type: Array as PropType<Array<Omix>>, default: () => [] }
    },
    setup(props, { slots }) {
        const { state, setState } = useState({ height: 300 })
        const element = useCurrentElement<HTMLElement>()
        const minWidth = computed(() => props.columns.reduce((max, next) => max + Number(next.minWidth ?? next.width ?? 80), 0))
        const columns = computed<Array<DataTableColumn>>(() => {
            return props.columns.map(data => ({
                // ellipsis: data.ellipsis ?? {
                //     tooltip: {
                //         scrollable: true,
                //         contentClass: 'max-w-540 max-h-450'
                //     }
                // },
                // ellipsisComponent: data.ellipsisComponent ?? 'performant-ellipsis',
                ...data
            }))
        })

        onMounted(async () => {
            await nextTick()
            console.log(element.value)
            return await setState({ height: element.value.clientHeight ?? 300 })
        })

        /**节点渲染**/
        function fetchColumnRender(value: any, data: Omix, base: Omix<DataTableColumn>) {
            console.log(base)
            if (isEmpty(value)) {
                return <span>-</span>
            } else if (slots[base.key]) {
                return slots[base.key]!(data)
            }
            return <span>{value}</span>
        }

        console.log(minWidth.value)

        return () => (
            <div class="common-data-table flex-1 h-full">
                <n-data-table
                    style={{ '--n-loading-size': '48px', height: state.height + 'px' }}
                    row-key={(row: Omix) => row.id}
                    columns={columns.value}
                    data={props.data}
                    scroll-x={minWidth.value}
                    render-cell={fetchColumnRender}
                    pagination={{ pageSize: 15 }}
                ></n-data-table>
            </div>
        )
    }
})
</script>
