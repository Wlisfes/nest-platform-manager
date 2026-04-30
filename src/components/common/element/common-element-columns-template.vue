<script lang="tsx">
import { defineComponent, computed, PropType, CSSProperties } from 'vue'

export default defineComponent({
    name: 'CommonElementColumnsTemplate',
    props: {
        /**类型**/
        type: { type: String as PropType<'fixed' | 'auto-fill' | 'auto-fit'>, default: 'fixed' },
        /**列/宽度**/
        number: { type: Number, required: true }
    },
    setup(props, { slots }) {
        const elementStyle = computed<CSSProperties>(() => {
            if (['auto-fit'].includes(props.type)) {
                return { gridTemplateColumns: `repeat(auto-fit, minmax(${props.number ?? 0}px, 1fr))` }
            } else if (['auto-fill'].includes(props.type)) {
                return { gridTemplateColumns: `repeat(auto-fill, ${props.number ?? 0}px)` }
            }
            return { gridTemplateColumns: `repeat(${props.number ?? 1}, minmax(0px, 1fr))` }
        })

        return () => (
            <common-element class="common-element-columns-template grid" style={elementStyle.value}>
                {slots.default && slots.default()}
            </common-element>
        )
    }
})
</script>
