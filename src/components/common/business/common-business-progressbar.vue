<script lang="tsx">
import { defineComponent, computed, PropType } from 'vue'

export default defineComponent({
    name: 'CommonBusinessProgressbar',
    props: {
        /**当前阶段**/
        stage: { type: String },
        /**全阶段数据**/
        items: { type: Array as PropType<Array<Omix>>, default: () => [] }
    },
    setup(props, ctx) {
        /**获取当前激活位置**/
        const level = computed(() => {
            return props.items.findIndex(item => item.value === props.stage)
        })

        return () => (
            <n-element class="common-business-progressbar grid-cols-7 h-28 flex b-rd-3 select-none overflow-hidden">
                {props.items.map((item, index) => (
                    <common-element-button class="common-progressbar" size="small" type="primary" secondary={!(level.value >= index)}>
                        {item.name}
                    </common-element-button>
                ))}
            </n-element>
        )
    }
})
</script>

<style lang="scss" scoped>
.common-progressbar {
    border-radius: 0;
    margin-inline-start: -6px;
    padding-inline-start: 10px;
    padding-inline-end: 10px;
    &:first-child {
        margin-inline-start: 0;
        clip-path: polygon(0% 0%, calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 0% 100%);
    }
    &:last-child {
        clip-path: polygon(100% 0, 100% 100%, 0% 100%, 10px 50%, 0% 0%);
    }
    &:not(:first-child):not(:last-child) {
        clip-path: polygon(calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 0% 100%, 10px 50%, 0% 0%);
    }
}
</style>
