<script lang="tsx">
import { defineComponent, h, PropType, VNode } from 'vue'
import { enter, fetchWherer, isNotEmpty } from '@/utils'

export default defineComponent({
    name: 'FormCommonColumnInput',
    emits: ['submit'],
    props: {
        /**输入框头部内容**/
        prefix: { type: Object as PropType<VNode> },
        /**输入框尾部内容**/
        suffix: { type: Object as PropType<VNode> }
    },
    setup(props, { emit, slots }) {
        return () => (
            <n-input class="form-common-column-input" onKeydown={(event: KeyboardEvent) => enter(event, () => emit('submit', event))}>
                {{
                    prefix: fetchWherer(isNotEmpty(slots.prefix) || isNotEmpty(props.prefix), () => {
                        return slots.prefix ? slots.prefix() : h(props.prefix as VNode)
                    }),
                    suffix: fetchWherer(isNotEmpty(slots.suffix) || isNotEmpty(props.suffix), () => {
                        return slots.suffix ? slots.suffix() : h(props.suffix as VNode)
                    })
                }}
            </n-input>
        )
    }
})
</script>
