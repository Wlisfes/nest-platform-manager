<script lang="tsx">
import { defineComponent } from 'vue'
import { useFullscreen } from '@vueuse/core'
import { useConfiger } from '@/store'

export default defineComponent({
    name: 'LayoutCommonNavigate',
    setup(props, ctx) {
        const configer = useConfiger()
        const { isFullscreen, toggle } = useFullscreen()

        return () => (
            <div class="flex flex-1 justify-end gap-16">
                <n-button text focusable={false}>
                    <common-icon size={24} name="nest-github"></common-icon>
                </n-button>
                <n-button text focusable={false} onClick={toggle}>
                    <common-icon size={24} name={isFullscreen.value ? 'nest-shrink' : 'nest-screen'}></common-icon>
                </n-button>
                <n-button text focusable={false} onClick={() => configer.fetchThemeUpdate()}>
                    <common-icon size={24} name={configer.theme === 'light' ? 'nest-light' : 'nest-dark'}></common-icon>
                </n-button>
                <n-button text focusable={false}>
                    <common-icon size={24} name="nest-notify"></common-icon>
                </n-button>
            </div>
        )
    }
})
</script>
