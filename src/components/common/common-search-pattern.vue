<script lang="tsx">
import { defineComponent } from 'vue'
import { useState } from '@/hooks/hook-state'

export default defineComponent({
    name: 'CommonSearchPattern',
    props: {
        colsValue: { type: [String, Number], required: true },
        colsPattern: { type: [String, Number], default: 5 }
    },
    setup(props, { emit, slots }) {
        return () => (
            <div class="common-search-pattern p-inline-12 p-bs-12">
                <n-grid cols={props.colsValue} x-gap={12} y-gap={12} item-responsive>
                    {slots.default && slots.default()}
                    <n-grid-item span={props.colsPattern} class="flex gap-10">
                        <n-input />
                        <n-button>
                            <n-icon size={18}>
                                <local-naive-filter />
                            </n-icon>
                            <span class="p-is-5">筛选</span>
                        </n-button>
                    </n-grid-item>
                </n-grid>
            </div>
        )
    }
})
</script>
