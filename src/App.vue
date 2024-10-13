<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'App',
    setup() {
        return () => (
            <layout-config-provider global-style>
                <layout-config-mount>
                    <router-view />
                </layout-config-mount>
            </layout-config-provider>
        )
    }
})
</script>
