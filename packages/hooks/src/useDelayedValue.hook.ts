// import hooks
import { useState, useEffect } from 'react'

export const useDelayedValue = <T>(value: T, delay: number = 300): T => {
  const [delayedValue, setDelayedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDelayedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return delayedValue
}

export default useDelayedValue
