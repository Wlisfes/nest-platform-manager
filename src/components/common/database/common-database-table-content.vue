<script lang="tsx">
import { defineComponent, PropType, Fragment } from 'vue'
import { isArray, isEmpty } from '@/utils'

export default defineComponent({
    name: 'CommonDatabaseTableContent',
    props: {
        /**渲染类型**/
        element: { type: String as PropType<'ellipsis' | 'performant-ellipsis'>, default: 'ellipsis' },
        /**内容**/
        value: { type: [String, Number, Array] },
        /**分割符合**/
        bit: { type: String, default: '、' }
    },
    setup(props, { slots }) {
        return () => {
            if (['performant-ellipsis'].includes(props.element)) {
                return (
                    <n-performant-ellipsis tooltip={{ scrollable: true, style: { maxWidth: '640px', maxHeight: '640px' } }}>
                        {slots.default ? (
                            slots.default()
                        ) : (
                            <Fragment>
                                {isEmpty(props.value) ? '-' : isArray(props.value) ? props.value.join(props.bit) : props.value}
                            </Fragment>
                        )}
                    </n-performant-ellipsis>
                )
            } else if (['ellipsis'].includes(props.element)) {
                return (
                    <n-ellipsis tooltip={{ scrollable: true, style: { maxWidth: '640px', maxHeight: '640px' } }}>
                        {slots.default ? (
                            slots.default()
                        ) : (
                            <Fragment>
                                {isEmpty(props.value) ? '-' : isArray(props.value) ? props.value.join(props.bit) : props.value}
                            </Fragment>
                        )}
                    </n-ellipsis>
                )
            }
            return slots.default ? (
                slots.default()
            ) : (
                <span>{isEmpty(props.value) ? '-' : isArray(props.value) ? props.value.join(props.bit) : props.value}</span>
            )
        }
    }
})
</script>
