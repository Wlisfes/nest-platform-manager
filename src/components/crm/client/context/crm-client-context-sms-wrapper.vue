<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CrmClientContextSmsWrapper',
    props: {},
    setup(props, { slots }) {
        return () => (
            <common-element is-white class="crm-client-context-sms-wrapper">
                {Array.from({ length: 50 }, () => (
                    <n-h2>crm-client-context-sms-wrapper</n-h2>
                ))}
            </common-element>
        )
    }
})
</script>
