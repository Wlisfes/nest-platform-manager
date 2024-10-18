<script lang="tsx">
import { defineComponent, watch } from 'vue'
import { useState } from '@/hooks/hook-state'

export default defineComponent({
    name: 'CommonSearchPattern',
    setup(props, { emit }) {
        return () => (
            <div class="common-search-pattern flex p-inline-12 p-bs-12">
                <div class="flex flex-col flex-1"></div>
                <div class="flex gap-10">
                    <n-input />
                    <n-button>筛选</n-button>
                </div>
            </div>
        )
    }
})
</script>
