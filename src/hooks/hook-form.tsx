import { ref, toRefs } from 'vue'
import { FormInst, FormRules, FormItemRule } from 'naive-ui'
import { useState } from '@/hooks/hook-state'
import { fetchDelay, fetchHandler } from '@/utils/utils-common'

export interface ScopeOption<T> {
    initialize?: boolean
    disabled?: boolean
    visible?: boolean
    loading?: boolean
    rules?: FormRules
    form: Omix<T>
}

/**自定义表单Hooks**/
export function useForm<T extends Omix>(option: ScopeOption<T>) {
    const formRef = ref<FormInst & { $el: HTMLElement }>()
    const form = ref<typeof option.form>(option.form)
    const { state, setState } = useState({
        initialize: option.initialize ?? true,
        disabled: option.disabled ?? false,
        visible: option.visible ?? false,
        loading: option.loading ?? false,
        rules: option.rules ?? {}
    })

    async function setForm(value: Partial<T>) {
        return (form.value = { ...(form.value as any), ...value })
    }

    /**验证表单**/
    function fetchValidate(formatter?: (e: Omix<FormItemRule>) => boolean): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!formRef.value) {
                return reject('不存在formRef实例')
            }
            //prettier-ignore
            formRef.value.validate(async err => {
                if (!err) {
                    return resolve(true)
                }
            }, formatter).catch(err => {
                return resolve(false)
            })
        })
    }

    /**重置表单校验结果**/
    function divineRestore() {
        return new Promise((resolve, reject) => {
            if (!formRef.value) {
                return reject('不存在formRef实例')
            }
            return resolve(formRef.value.restoreValidation())
        })
    }

    /**滚动到第一个报错表单选项**/
    async function fetchScrollbar() {
        await fetchDelay(0)
        return await fetchHandler(Boolean(formRef.value), {
            handler: async () => {
                const element = formRef.value!.$el.querySelector('.el-form-item__error')
                return element!.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
        })
    }

    return {
        form,
        formRef,
        state,
        ...toRefs(state),
        setState,
        setForm,
        fetchValidate,
        divineRestore,
        fetchScrollbar
    }
}
