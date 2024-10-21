<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CommonContainer',
    props: {
        loading: { type: Boolean, default: false },
        opacity: { type: Number, default: 0 },
        absolute: { type: Boolean, default: false },
        className: { type: String, default: '' },
        space: { type: Number, default: 12 }
    },
    setup(props, { slots }) {
        return () => (
            <n-element class={{ 'common-container flex flex-col flex-1 overflow-hidden': true, 'is-absolute': props.absolute }}>
                {/* <n-spin
                    size="large"
                    class="flex flex-col flex-1 overflow-hidden"
                    content-class="flex flex-1 flex-col overflow-hidden"
                    style={{ '--n-opacity-spinning': props.opacity }}
                    show={props.loading}
                >
                    <n-card
                        class="flex flex-col flex-1 overflow-hidden"
                        content-style={{ padding: props.space + 'px' }}
                        content-class={props.className}
                        bordered={false}
                    >
                        {slots}
                    </n-card>
                </n-spin> */}
            </n-element>
        )
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
    }
}
</style>
