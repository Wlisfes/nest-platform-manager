<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'FormCommonItem',
    props: {},
    setup(props, { slots }) {
        return () => <n-form-item show-feedback={false}>{slots.default && slots.default()}</n-form-item>
    }
})
</script>
