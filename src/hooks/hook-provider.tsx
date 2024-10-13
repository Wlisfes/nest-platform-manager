import { computed, ComputedRef } from 'vue'
import { useThemeVars, darkTheme, lightTheme, GlobalThemeOverrides, ThemeCommonVars } from 'naive-ui'
import { useConfiger, useStore } from '@/store'

export interface CustomThemeCommonVars extends Omix<ThemeCommonVars> {}

export function useProvider() {
    const { theme } = useStore(useConfiger)
    const vars = useThemeVars() as ComputedRef<CustomThemeCommonVars>

    /**主题反转**/
    const inverted = computed(() => theme.value === 'dark')
    const themeStyle = computed(() => (inverted.value ? darkTheme : lightTheme))

    const themeOverrides = computed(() => {
        return inverted.value ? darkThemeOverrides.value : lightThemeOverrides.value
    })

    const lightThemeOverrides = computed<GlobalThemeOverrides & { common: Partial<CustomThemeCommonVars> }>(() => ({
        common: {}
    }))
    const darkThemeOverrides = computed<GlobalThemeOverrides & { common: Partial<CustomThemeCommonVars> }>(() => ({
        common: {}
    }))

    return { theme, themeStyle, themeOverrides, vars, inverted }
}
