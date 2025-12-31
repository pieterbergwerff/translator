// import hooks
import { useEffect, useRef } from 'react'

type UseSettingsShortcutOptions = {
  /** Enable/disable shortcut. */
  enabled?: boolean
  /** Event target to attach listener to. Defaults to window (when available). */
  target?: Window | Document | HTMLElement | null
  /** Dispatch this DOM event name. Defaults to "app:open-settings". */
  eventName?: string
  /** preventDefault() when detected (if cancelable). */
  preventDefault?: boolean
  /** stopPropagation() when detected. */
  stopPropagation?: boolean
  /** Require no extra modifiers besides Ctrl/Meta (disallows Shift/Alt). */
  requireNoExtraModifiers?: boolean
  /** Use capture phase. */
  capture?: boolean
}

export function useSettingsShortcutHook(options: UseSettingsShortcutOptions = {}) {
  const {
    enabled = true,
    target = typeof window !== 'undefined' ? window : null,
    eventName = 'app:open-settings',
    preventDefault = true,
    stopPropagation = false,
    requireNoExtraModifiers = true,
    capture = true,
  } = options

  const eventNameRef = useRef(eventName)
  useEffect(() => {
    eventNameRef.current = eventName
  }, [eventName])

  useEffect(() => {
    if (!target || !enabled) return

    const handler = (e: Event) => {
      if (!(e instanceof KeyboardEvent)) return
      const isCtrlOrMeta = e.ctrlKey || e.metaKey
      if (!isCtrlOrMeta) return

      if (requireNoExtraModifiers && (e.shiftKey || e.altKey)) return

      const isComma = e.key === ',' || e.code === 'Comma'
      if (!isComma) return

      if (preventDefault && e.cancelable) e.preventDefault()
      if (stopPropagation) e.stopPropagation()

      const detail = {
        ctrlKey: e.ctrlKey,
        metaKey: e.metaKey,
        altKey: e.altKey,
        shiftKey: e.shiftKey,
        key: e.key,
        code: e.code,
      }

      // Dispatch on the same target if possible, otherwise fall back to document.
      const dispatchTarget = (
        target as unknown as EventTarget & { dispatchEvent?: (ev: Event) => boolean }
      ).dispatchEvent
        ? (target as unknown as EventTarget)
        : document

      dispatchTarget.dispatchEvent(new CustomEvent(eventNameRef.current, { detail }))
    }

    target.addEventListener('keydown', handler, { capture })

    return () => {
      target.removeEventListener('keydown', handler, { capture })
    }
  }, [target, enabled, preventDefault, stopPropagation, requireNoExtraModifiers, capture])
}

export default useSettingsShortcutHook
