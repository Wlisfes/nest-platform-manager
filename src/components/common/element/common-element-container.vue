<script lang="tsx">
import { defineComponent, computed, CSSProperties, Fragment } from 'vue'

export default defineComponent({
    name: 'CommonElementContainer',
    setup(props, { slots }) {
        const elementStyles = computed<CSSProperties>(() => ({
            transition: 'background-color 0.3s var(--n-bezier)'
        }))

        return () => (
            <n-element class="common-element-container flex flex-col bg-[var(--common-body-color)]" style={elementStyles.value}>
                <Fragment>{slots.default && slots.default()}</Fragment>
            </n-element>
        )
    }
})
</script>
