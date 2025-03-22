<script lang="tsx">
import { defineComponent } from 'vue'
import { useFullscreen } from '@vueuse/core'

export default defineComponent({
    name: 'LayoutCommonStore',
    setup(props, ctx) {
        const { isFullscreen, toggle } = useFullscreen()

        return () => (
            <div class="layout-common-store p-inline-6 p-block-6">
                <n-button quaternary>Default</n-button>
                <n-button quaternary>Default</n-button>
            </div>
        )
    }
})
</script>
