'use client'

// import hooks
import { useState, useEffect } from 'react'
import useSettingsShortcut from '@packages/hooks/useSettingsShortcut.hook.ts'

// import components
import Dialog from '@packages/components/molecules/Dialog'
import SwitchThemeMode from '@packages/components/molecules/SwitchThemeMode'
import Label from '@packages/components/atoms/Label'

// import types
import type { FC } from 'react'

export const SettingsModalOrganismComponent: FC = () => {
  const [modalOpen, setModalOpen] = useState(false)

  // Listen for keyboard shortcut (Cmd/Ctrl + ,)
  useSettingsShortcut({ eventName: 'app:open-settings' })

  // Listen for custom event from UI buttons
  useEffect(() => {
    const onOpen = () => {
      setModalOpen(true)
    }

    window.addEventListener('app:open-settings', onOpen)

    return () => {
      window.removeEventListener('app:open-settings', onOpen)
    }
  }, [])

  return (
    <Dialog
      open={modalOpen}
      title="Settings"
      description="Adjust your application settings"
      onClose={setModalOpen}
    >
      <Label>Theme Mode</Label>
      <SwitchThemeMode />
    </Dialog>
  )
}

export default SettingsModalOrganismComponent
