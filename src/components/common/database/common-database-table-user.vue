<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { isNotEmpty } from '@/utils'

export default defineComponent({
    name: 'CommonDatabaseTableUser',
    props: {
        /**渲染类型**/
        element: { type: String as PropType<'avatar' | 'text'>, default: 'text' },
        /**数据对象**/
        data: { type: Object as PropType<Omix>, default: () => ({}) }
    },
    setup(props) {
        return () => {
            if (['text'].includes(props.element) && isNotEmpty(props.data?.name) && isNotEmpty(props.data?.number)) {
                return <span>{`${props.data.name} ${props.data.number}`}</span>
            } else if (['avatar'].includes(props.element) && isNotEmpty(props.data?.avatar)) {
                return <n-image width="100" src={props.data.avatar} />
            }
            return <span>-</span>
        }
    }
})
</script>
