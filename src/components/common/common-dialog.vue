<script lang="tsx">
import { defineComponent, computed } from 'vue'
import { createTransfer } from '@/plugins/transfer/transfer'

export default defineComponent({
    name: 'CommonDialog',
    emits: ['close', 'submit'],
    props: {
        width: { type: String, default: '640px' },
        height: { type: Number, default: 90 },
        visible: { type: Boolean, default: false },
        action: { type: Boolean, default: true },
        actionJustify: { type: String, default: 'center' },
        cancelText: { type: String, default: '取消' },
        confirmText: { type: String, default: '确定' }
    },
    setup(props, { emit, slots }) {
        const maxHeight = computed(() => {
            const scale = (props.height > 90 ? 90 : props.height) / 100
            return window.innerHeight * scale - (60 + (props.action ? 82 : 24)) + 'px'
        })

        return () => (
            <n-modal
                preset="dialog"
                type="success"
                class="flex flex-col overflow-hidden"
                content-class="m-0! flex flex-col flex-1 overflow-hidden"
                title-class="line-height-24 p-is-24 p-ie-58! p-block-20 select-none cursor-move"
                style={{ '--n-padding': '0px', '--n-close-margin': '20px 20px 0 0', width: props.width }}
                auto-focus={false}
                mask-closable={false}
                show-icon={false}
                on-after-enter={(el: HTMLElement) => createTransfer(el)}
                v-slots={{
                    action: () => (
                        <div class={{ 'flex-1 p-inline-24 p-be-24 overflow-hidden': true, 'p-bs-24': props.action }}>
                            {props.action && (
                                <n-flex size="large" justify={props.actionJustify}>
                                    <n-button class="min-w-80" onClick={() => emit('close')}>
                                        {props.cancelText}
                                    </n-button>
                                    <n-button class="min-w-80" type="primary" onClick={() => emit('submit')}>
                                        {props.confirmText}
                                    </n-button>
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
