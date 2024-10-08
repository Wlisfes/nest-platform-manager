<script lang="tsx">
import { defineComponent, watch } from 'vue'
import { useState } from '@/hooks/hook-state'

export default defineComponent({
    name: 'CommonState',
    props: {
        loading: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false }
    },
    setup(props, { slots, emit }) {
        const { state, setState } = useState({ loading: props.loading, disabled: props.disabled })

        watch(() => [state.disabled, state.loading], fetchWatchState)
        async function fetchWatchState() {
            await emit('update:disabled', state.disabled)
            return await emit('update:loading', state.loading)
        }

        watch(() => [props.disabled, props.loading], fetchWatchProps)
        async function fetchWatchProps() {
            return await setState({ loading: props.loading, disabled: props.disabled })
        }

        return () => {
            return slots.default ? slots.default(state, setState) : null
        }
    }
})
</script>
