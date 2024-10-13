<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'BasicMenu',
    setup(props, ctx) {
        return () => (
            <n-layout
                position="absolute"
                //class="flex-1 flex flex-col bg-#eef1f5"
                has-sider
                //content-class="flex flex-col flex-1 overflow-hidden"
            >
                <n-layout-sider native-scrollbar={false} width={280} collapsed-width={0}>
                    大苏打
                    {Array.from({ length: 30 }, (x, index) => (
                        <n-h1>{index}</n-h1>
                    ))}
                    <div class="overflow-hidden"></div>
                </n-layout-sider>
            </n-layout>
        )
    }
})
</script>
