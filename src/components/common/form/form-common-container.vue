<script lang="tsx">
import { defineComponent, ref, Ref } from 'vue'
import { FormInst } from 'naive-ui'

export default defineComponent({
    name: 'FormCommonContainer',
    props: {},
    setup(props, { slots }) {
        const formRef = ref<FormInst>() as Ref<FormInst & Omix<{ $el: HTMLFormElement }>>

        return () => (
            <n-form ref={formRef} class="form-common-container">
                {slots.default && slots.default()}
            </n-form>
        )
    }
})
</script>
