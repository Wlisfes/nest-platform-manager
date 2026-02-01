<script lang="tsx">
import { defineComponent, computed, PropType } from 'vue'
import { isEmpty, isNotEmpty, fetchCurrent } from '@/utils'

export default defineComponent({
    name: 'CommonDatabaseTableChunk',
    props: {
        /**渲染类型**/
        element: { type: String as PropType<'chunk' | 'text'>, default: 'chunk' },
        /**回显列表**/
        options: { type: Array as PropType<Array<Omix>>, default: () => [] },
        /**文本内容**/
        value: { type: [String, Number] }
    },
    setup(props, { slots }) {
        /**标签枚举数据**/
        const itemNode = computed(() => fetchCurrent(props.options, e => e.value == props.value))

        return () => {
            if (isEmpty(itemNode.value)) {
                return <span>{props.value ?? '-'}</span>
            } else if (['chunk'].includes(props.element)) {
                if (isNotEmpty(itemNode.value.name) && isNotEmpty(itemNode.value.json)) {
                    return slots.default ? (
                        slots.default(itemNode.value)
                    ) : (
                        <n-tag bordered={false} type={itemNode.value.json.type}>
                            {itemNode.value.name}
                        </n-tag>
                    )
                }
                return <span>{props.value ?? '-'}</span>
            } else if (['text'].includes(props.element)) {
                if (isNotEmpty(itemNode.value.name) && isNotEmpty(itemNode.value.json)) {
                    return slots.default ? (
                        slots.default(itemNode.value)
                    ) : (
                        <n-text type={itemNode.value.json.type}>{itemNode.value.name}</n-text>
                    )
                }
                return <span>{props.value ?? '-'}</span>
            }
            return <span>{props.value ?? '-'}</span>
        }
    }
})
</script>
