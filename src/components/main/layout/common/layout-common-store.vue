<script lang="tsx">
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useConfiger } from '@/store'
import { BScroll } from '@/plugins/better-scroll'

export default defineComponent({
    name: 'LayoutCommonStore',
    setup(props, ctx) {
        const router = useRouter()
        const configer = useConfiger()
        const element = ref<HTMLElement>()

        async function fetchJumpRouter(data: Omix) {
            if (data.fullPath !== router.currentRoute.value.fullPath) {
                return await router.push({ path: data.fullPath })
            }
        }

        onMounted(fetchInitScrollbar)
        async function fetchInitScrollbar() {
            return new BScroll(element.value as HTMLElement, {
                probeType: 1,
                scrollX: true,
                scrollY: false,
                bounce: false,
                mouseWheel: true,
                observeDOM: true,
                scrollbar: true
            })
        }

        return () => (
            <n-layout-header class="layout-common-store flex gap-10 overflow-hidden p-inline-12 p-be-8">
                <div ref={element} class="flex-1 whitespace-nowrap overflow-hidden relative  cursor-pointer">
                    <div class="inline-flex gap-10 element-bscrollbar">
                        {configer.menuRouter.map(item => (
                            <div key={item.fullPath} class="select-none inline-flex element-block">
                                <common-element-button
                                    secondary
                                    size="small"
                                    type={item.fullPath === router.currentRoute.value.fullPath ? 'primary' : undefined}
                                    onClick={() => fetchJumpRouter(item)}
                                >
                                    {item.meta.title}
                                </common-element-button>
                            </div>
                        ))}
                    </div>
                </div>
                <div class="flex gap-10">
                    <common-element-button secondary size="small" class="p-inline-4!">
                        <common-element-icon size={20} name="nest-double-left"></common-element-icon>
                    </common-element-button>
                    <common-element-button secondary size="small" class="p-inline-4!">
                        <common-element-icon size={20} name="nest-double-right"></common-element-icon>
                    </common-element-button>
                    <common-element-button secondary size="small" class="p-inline-3!">
                        <common-element-icon size={22} name="nest-vertical-more"></common-element-icon>
                    </common-element-button>
                </div>
            </n-layout-header>
        )
    }
})
</script>
