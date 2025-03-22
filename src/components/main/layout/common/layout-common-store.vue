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
            <common-element bordered={false} class="layout-common-store" class-name="flex gap-10 overflow-hidden">
                <div ref={element} class="flex-1 whitespace-nowrap overflow-hidden relative p-be-10 cursor-pointer">
                    <div class="inline-flex gap-10 element-bscrollbar">
                        {configer.menuRouter.map(item => (
                            <div key={item.fullPath} class="select-none inline-flex element-block">
                                <n-button
                                    secondary
                                    type={item.fullPath === router.currentRoute.value.fullPath ? 'primary' : undefined}
                                    onClick={() => fetchJumpRouter(item)}
                                >
                                    {item.meta.title}
                                </n-button>
                            </div>
                        ))}
                    </div>
                </div>
                <div class="flex gap-10 p-ie-10 p-be-10">
                    <n-button secondary class="p-inline-5!">
                        <common-icon size={24} name="nest-double-left"></common-icon>
                    </n-button>
                    <n-button secondary class="p-inline-5!">
                        <common-icon size={24} name="nest-double-right"></common-icon>
                    </n-button>
                    <n-button secondary class="p-inline-4!">
                        <common-icon size={26} name="nest-vertical-more"></common-icon>
                    </n-button>
                </div>
            </common-element>
        )
    }
})
</script>
