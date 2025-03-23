<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'LayoutCommonContainer',
    setup(props, { slots }) {
        return () => <n-element class="layout-common-container">{slots.default && slots.default()}</n-element>
    }
})
</script>

<style lang="scss" scoped>
.layout-common-container {
    position: relative;
    background-color: var(--common-body-color);
    transition: background-color 0.3s var(--n-bezier);
}
</style>
