/**
 * Dispatches the app:open-settings custom event to open the settings modal
 */
export const dispatchSettingsEventUtil = (): void => {
  window.dispatchEvent(new CustomEvent('app:open-settings'))
}

export default dispatchSettingsEventUtil
