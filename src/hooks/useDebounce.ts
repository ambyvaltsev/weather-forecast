import { useEffect, useState } from "react"




export const useDebounce = (value: string, delay: number): string => {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timerId = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timerId)

  }, [value, delay])



  return debounced
}