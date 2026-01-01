export const isThemeModeSystemDarkUtil = (): boolean => {
  if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
    return false
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export default isThemeModeSystemDarkUtil
