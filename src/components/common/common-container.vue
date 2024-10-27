<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CommonContainer',
    props: {
        loading: { type: Boolean, default: false },
        opacity: { type: Number, default: 0 },
        absolute: { type: Boolean, default: false },
        contentClass: { type: String, default: 'flex flex-col' },
        space: { type: Number, default: 0 }
    },
    setup(props, { slots }) {
        return () => (
            <n-element class={{ 'common-container flex flex-col flex-1 overflow-hidden': true, 'is-absolute': props.absolute }}>
                <n-card class="flex flex-col flex-1" content-class="p-0! flex flex-col flex-1" bordered={false}>
                    <n-spin
                        size="large"
                        class="flex flex-col flex-1"
                        style={{ '--n-opacity-spinning': props.opacity }}
                        content-style={{ padding: props.space + 'px' }}
                        content-class={`flex-1 ${props.contentClass}`}
                        show={props.loading}
                    >
                        {slots}
                    </n-spin>
                </n-card>
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
