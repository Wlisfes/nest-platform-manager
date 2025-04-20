<script lang="tsx">
import { defineComponent, ref, Ref } from 'vue'
import { PopoverInst } from 'naive-ui'
import { useConfiger } from '@/store'

export default defineComponent({
    name: 'CommonDatabaseDensity',
    emits: ['refresh'],
    props: {
        /**左侧容器样式**/
        elementClass: { type: String, default: '' },
        /**加载中**/
        loading: { type: Boolean, default: false }
    },
    setup(props, { slots, emit }) {
        const instance = ref() as Ref<PopoverInst>
        const configer = useConfiger()
        const options = ref([
            { value: 'large', label: '宽松' },
            { value: 'medium', label: '默认' },
            { value: 'small', label: '紧凑' }
        ])

        // return () => (
        //     <n-popover ref={instance} placement="bottom" trigger="click" arrow-point-to-center>
        //         {{
        //             trigger: () => <common-element-button text icon="nest-density" icon-size={22}></common-element-button>,

        //             default: () => <n-element class="flex flex-col">dsada</n-element>
        //         }}
        //     </n-popover>
        // )

        return () => (
            <n-popselect trigger="click" placement="bottom" width={80} v-model:value={configer.elementSize} options={options.value}>
                <common-element-button text icon="nest-density" icon-size={22}></common-element-button>
            </n-popselect>
        )
    }
})
</script>
