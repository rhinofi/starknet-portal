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

// const fonts = {
//   mainFont: 'Lexend, sans-serif',
//   secondaryFont: 'Lato, sans-serif',
//   defaultFontSize: '14px'
// }

// export const commonColors = {
//   defaultFontColor: '#fff',
//   background: '#0A1017',
//   neutral900: '#191F30',
//   neutral800: '#1E2639',
//   neutral700: '#222B42',
//   neutral600: '#27324B',
//   neutral300: '#647496',
//   neutral200: '#8CA0C6',
//   neutral100: '#B0C0E0',
//   primary300: '#A365FE',
//   negative600: '#CC4551',
//   secondary500: '#59D2A9',
//   grey100: '#1E1F25',
//   gradient1: 'linear-gradient(180deg, #191F30 0%, #000000 100%)',
//   greyBorder: 'rgba(230, 231, 233, 0.1)'
// }

// const themes = {
//   light: {
//     theme: 'light',
//     ...fonts,
//     ...commonColors
//   },
//   dark: {
//     theme: 'dark',
//     ...fonts,
//     ...commonColors,
//     defaultTextColorRGB: '100,116,150'
//   }
// }

// export default themes
