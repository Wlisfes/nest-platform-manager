<script lang="tsx">
import { defineComponent, ref, Ref } from 'vue'
import { PopoverInst } from 'naive-ui'
import { useVModels } from '@vueuse/core'
import { enter } from '@/utils/utils-common'

export default defineComponent({
    name: 'CommonElementSearch',
    emits: ['submit', 'update:keyword'],
    props: {
        /**排列布局**/
        cols: { type: Number, default: 1 },
        /**弹出层最大宽度**/
        maxWidth: { type: String, default: '450px' },
        /**弹出层最大高度**/
        maxHeight: { type: String, default: '450px' },
        /**模糊查询关键字**/
        vague: { type: String },
        /**搜索框占位符**/
        placeholder: { type: String },
        /**字符占位宽度**/
        labelWidth: { type: String, default: 'auto' }
    },
    setup(props, { emit, slots }) {
        const instance = ref() as Ref<PopoverInst>
        const { vague } = useVModels(props, emit)

        /**输入框回车事件**/
        async function fetchKeyup(evt: KeyboardEvent) {
            return enter(evt, async () => {
                return await fetchEvent('input-submit')
            })
        }

        /**事件触发**/
        async function fetchEvent(eventName: 'input-submit' | 'submit' | 'refresh') {
            return await emit('submit', { event: eventName })
        }

        /**确定提交**/
        async function fetchSubmit(evt: MouseEvent) {
            return await fetchEvent('submit').then(() => {
                return instance.value.setShow(false)
            })
        }

        return () => (
            <div class="common-element-action flex flex-1 gap-10">
                <n-input v-model:value={vague.value} placeholder={props.placeholder} onKeyup={fetchKeyup}>
                    {{ prefix: () => <n-icon size={18} component={<local-nest-search />}></n-icon> }}
                </n-input>
                <n-popover ref={instance} placement="bottom" trigger="click" style={{ padding: 0 }}>
                    {{
                        trigger: () => (
                            <n-button focusable={false} v-slots={{ icon: () => <local-nest-filter /> }}>
                                <span>筛选</span>
                            </n-button>
                        ),
                        default: () => (
                            <n-element class="flex flex-col w-full" style={{ maxWidth: props.maxWidth }}>
                                <n-h1 class="m-0 text-16 line-height-24 p-inline-14 p-block-10">高级筛选</n-h1>
                                <n-scrollbar style={{ maxHeight: props.maxHeight }}>
                                    <n-form class="p-inline-14" label-width={props.labelWidth} label-placement="left" show-feedback={false}>
                                        <n-grid cols={props.cols >= 2 ? 2 : props.cols} y-gap={12} x-gap={12}>
                                            <n-form-item-gi span={1} label="消费用户导入" path="user.name">
                                                <n-input placeholder="输入姓名" />
                                            </n-form-item-gi>
                                            <n-form-item-gi label="姓名" path="user.name">
                                                <n-input placeholder="输入姓名" />
                                            </n-form-item-gi>
                                            <n-form-item-gi label="姓名" path="user.name">
                                                <n-input placeholder="输入姓名" />
                                            </n-form-item-gi>
                                            <n-form-item-gi label="姓名" path="user.name">
                                                <n-input placeholder="输入姓名" />
                                            </n-form-item-gi>
                                            <n-form-item-gi label="姓名" path="user.name">
                                                <n-input placeholder="输入姓名" />
                                            </n-form-item-gi>
                                            <n-form-item-gi label="姓名" path="user.name">
                                                <n-input placeholder="输入姓名" />
                                            </n-form-item-gi>
                                            <n-form-item-gi label="姓名" path="user.name">
                                                <n-input placeholder="输入姓名" />
                                            </n-form-item-gi>
                                            <n-form-item-gi label="姓名" path="user.name">
                                                <n-input placeholder="输入姓名" />
                                            </n-form-item-gi>
                                            <n-form-item-gi label="姓名" path="user.name">
                                                <n-input placeholder="输入姓名" />
                                            </n-form-item-gi>
                                            <n-form-item-gi label="姓名" path="user.name">
                                                <n-input placeholder="输入姓名" />
                                            </n-form-item-gi>
                                            <n-form-item-gi label="姓名" path="user.name">
                                                <n-input placeholder="输入姓名" />
                                            </n-form-item-gi>
                                            <n-form-item-gi span={2} label="姓名" path="user.name">
                                                <n-date-picker type="datetimerange" clearable default-time="13:22:11" class="w-full" />
                                            </n-form-item-gi>
                                        </n-grid>
                                    </n-form>
                                </n-scrollbar>
                                <n-flex justify="center" class="p-inline-14 p-block-10">
                                    <n-button class="min-w-80">重置</n-button>
                                    <n-button class="min-w-80" type="primary" onClick={fetchSubmit}>
                                        确定
                                    </n-button>
                                </n-flex>
                            </n-element>
                        )
                    }}
                </n-popover>
            </div>
        )
    }
})
</script>
