<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CommonElementScrollbar',
    setup(props, { slots }) {
        return () => (
            <n-scrollbar class="common-element-scrollbar flex-1" content-class="min-h-full flex flex-col" trigger="none">
                {slots.default && slots.default()}
            </n-scrollbar>
        )
    }
})
</script>
