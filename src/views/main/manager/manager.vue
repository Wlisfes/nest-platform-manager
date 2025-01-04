<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'BaseManager',
    setup(props, ctx) {
        return () => (
            <div>
                <div>工作台</div>
                {Array.from({ length: 100 }, (x, index) => (
                    <n-h1>{index}</n-h1>
                ))}
            </div>
        )
    }
})
</script>
