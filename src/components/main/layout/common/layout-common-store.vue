<script lang="tsx">
import { defineComponent, ref, onMounted } from 'vue'
import { BScroll } from '@/plugins/better-scroll'

export default defineComponent({
    name: 'LayoutCommonStore',
    setup(props, ctx) {
        const element = ref<HTMLElement>()

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
                <div ref={element} class="whitespace-nowrap overflow-hidden relative p-be-10 cursor-pointer">
                    <div class="inline-flex gap-10 element-bscrollbar">
                        {Array.from({ length: 50 }, (x, index) => (
                            <div class="select-none inline-flex element-block">
                                <n-button secondary type="primary">
                                    资源管理
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
