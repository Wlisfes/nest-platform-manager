<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CommonElement',
    props: {
        className: { type: String, default: '' }
    },
    setup(props, { slots }) {
        return () => (
            <n-card
                class="common-element"
                content-class={`${props.className}`}
                style={{ '--n-padding-left': '0px', '--n-padding-bottom': '0px' }}
            >
                {slots}
            </n-card>
        )
    }
})
</script>
