<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CommonSearchColumn',
    setup(props, { slots }) {
        return () => (
            <n-form-item class="common-search-column" label-placement="left" show-feedback={false}>
                {slots.default && slots.default()}
            </n-form-item>
        )
    }
})
</script>
