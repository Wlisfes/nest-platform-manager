<script lang="tsx">
import { defineComponent, onMounted, PropType } from 'vue'
import { useForm } from '@/hooks/hook-form'

export default defineComponent({
    name: 'SystemDialogBasicMenu',
    emits: ['close', 'submit'],
    setup(props, { emit }) {
        const { state, form, setForm, setState } = useForm({
            form: {},
            rules: {}
        })

        onMounted(async () => {
            await setState({ visible: true })
            // return await divineHandler(Boolean(props.uid), {
            //     handler: fetchUserSender
            // })
        })

        return () => (
            <n-modal
                v-model:show={state.visible}
                auto-focus={false}
                mask-closable={false}
                show-icon={false}
                preset="dialog"
                //style={chunkContent.value}
                //onAfterEnter={(el: HTMLElement) => divineTransfer(el)}
                on-after-leave={() => emit('close')}
                //title={divineRender(<done-title content={props.title}></done-title>)}
            >
                <div>dfasfsdf</div>
            </n-modal>
        )
    }
})
</script>
