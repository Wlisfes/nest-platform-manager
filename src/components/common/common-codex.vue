<script lang="tsx">
import { defineComponent, onMounted } from 'vue'
import { useState } from '@/hooks/hook-state'
import { Observer } from '@/utils/utils-observer'
import { fetchDelay } from '@/utils/utils-common'
const observer = Observer()
const COMMON_CODEX_REPEAT = Symbol('COMMON_CODEX_REPEAT')

export async function fetchRefresh() {
    return observer.emit(COMMON_CODEX_REPEAT)
}

export default defineComponent({
    name: 'CommonCodex',
    props: {
        disabled: { type: Boolean },
        baseURL: { type: String, default: '/api/account/member/login/codex' }
    },
    setup(props) {
        const { state, setState } = useState({ initialize: true, loading: false, baseURL: '' })

        observer.on(COMMON_CODEX_REPEAT, fetchRepeat)

        onMounted(async () => {
            await fetchRepeat()
            return await setState({ initialize: false })
        })

        async function fetchRepeat() {
            return await setState({ loading: true, baseURL: `${props.baseURL}?t=${Math.random()}` })
        }

        async function fetchState() {
            await fetchDelay(100)
            return await setState({ loading: false })
        }

        return () => (
            <n-spin class="common-codex" size="small" content-class="flex flex-col" show={state.loading}>
                <n-button
                    class="p-0"
                    size="large"
                    secondary
                    disabled={state.initialize || state.loading || props.disabled}
                    onClick={fetchRepeat}
                >
                    <n-image class="flex flex-col" preview-disabled src={state.baseURL} on-load={fetchState} on-error={fetchState}>
                        {{
                            placeholder: () => (
                                <n-skeleton width={120} height={40} style={{ borderRadius: 'var(--n-border-radius)' }}></n-skeleton>
                            )
                        }}
                    </n-image>
                </n-button>
            </n-spin>
        )
    }
})
</script>
