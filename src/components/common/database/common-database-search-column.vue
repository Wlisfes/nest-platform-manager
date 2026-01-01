<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CommonDatabaseSearchColumn',
    props: {
        /**单位格数量**/
        span: { type: Number, default: 1 },
        /**描述**/
        label: { type: String }
    },
    setup(props, { slots }) {
        return () => (
            <n-form-item
                class={`common-database-search-column grid-col-span-${props.span > 1 ? 2 : 1} `}
                show-feedback={false}
                label={props.label}
            >
                {slots.default && slots.default()}
            </n-form-item>
        )
    }
})
</script>
