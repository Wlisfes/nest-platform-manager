<script lang="tsx">
import { defineComponent, computed } from 'vue'
import { useVModels } from '@vueuse/core'
import { createTransfer } from '@/plugins/transfer/transfer'

export default defineComponent({
    name: 'CommonDialog',
    emits: ['close', 'update:visible'],
    props: {
        width: { type: String, default: '640px' },
        height: { type: Number, default: 90 },
        visible: { type: Boolean, default: false },
        action: { type: Boolean, default: true },
        actionJustify: { type: String, default: 'center' }
    },
    setup(props, { emit, slots }) {
        const { visible } = useVModels(props, emit)
        const maxHeight = computed(() => {
            const scale = (props.height > 90 ? 90 : props.height) / 100
            return window.innerHeight * scale - (60 + (props.action ? 74 : 24)) + 'px'
        })

        return () => (
            <n-modal
                preset="dialog"
                type="success"
                class="flex flex-col overflow-hidden"
                content-class="m-0! flex flex-col flex-1 overflow-hidden"
                title-class="line-height-24 p-is-24 p-ie-58! p-bs-20 p-be-16 select-none cursor-move"
                style={{ '--n-padding': '0px', '--n-close-margin': '20px 20px 0 0', width: props.width }}
                v-model:show={visible.value}
                auto-focus={false}
                mask-closable={false}
                show-icon={false}
                on-after-leave={() => emit('close')}
                on-after-enter={(el: HTMLElement) => createTransfer(el)}
                v-slots={{
                    action: () => (
                        <div class="flex-1 p-inline-24 p-be-24 overflow-hidden">
                            {props.action && (
                                <n-flex class="p-bs-16" size="large" justify={props.actionJustify}>
                                    <n-button>Default</n-button>
                                    <n-button type="primary">Primary</n-button>
                                </n-flex>
                            )}
                        </div>
                    ),
                    default: () => (
                        <n-scrollbar trigger="none" style={{ maxHeight: maxHeight.value }}>
                            {slots}
                        </n-scrollbar>
                    )
                }}
            ></n-modal>
        )
    }
})
</script>
