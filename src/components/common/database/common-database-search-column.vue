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
            <form-common-column
                class={`common-database-search-column ${props.span > 1 ? 'grid-col-span-2' : 'grid-col-span-1'}`}
                show-feedback={false}
                label={props.label}
            >
                {slots.default && slots.default()}
            </form-common-column>
        )
    }
})
</script>
