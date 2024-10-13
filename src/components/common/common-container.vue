<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CommonContainer',
    props: {
        absolute: { type: Boolean, default: false }
    },
    setup(props, { slots }) {
        return () => <n-element class={{ 'common-container': true, 'is-absolute': props.absolute }}>{slots}</n-element>
    }
})
</script>

<style lang="scss" scoped>
.common-container {
    background-color: var(--app-back-color);
    transition: background-color 0.3s var(--n-bezier);
    &.is-absolute {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        overflow: hidden;
    }
}
</style>
