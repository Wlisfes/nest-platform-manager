<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CrmClientContextBasicWrapper',
    props: {},
    setup(props, { slots }) {
        return () => (
            <common-element is-white class="crm-client-context-basic-wrapper">
                {Array.from({ length: 50 }, () => (
                    <n-h2>dasdasdasd</n-h2>
                ))}
            </common-element>
        )
    }
})
</script>
