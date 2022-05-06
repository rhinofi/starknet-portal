import { dark, defaultTheme, light } from '@deversifi/dvf-shared-ui/lib/theme/index'

export const getTheme = (store: any, theme: any) => {
  if (store && theme) {
    return theme[store.getState().portal.selectedTheme]
  }

  return theme
}

const themes = {
  light: {
    ...defaultTheme,
    ...light
  },
  dark: {
    ...defaultTheme,
    ...dark
  }
}

export const commonColors = {}

export default themes
