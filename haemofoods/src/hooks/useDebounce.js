import { useState, useEffect } from 'react'

// delays updating a value until the user stops changing it
// prevents firing an API call on every keystroke
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // set a timer to update the value after the delay
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // if the value changes again before the delay, cancel the old timer
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}