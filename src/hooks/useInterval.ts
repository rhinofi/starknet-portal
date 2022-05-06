import { useEffect, useRef } from 'react'

/**
 * Hook that handles polling / interval calls
 */
export const useInterval = (
  callback: () => void,
  delay = 1000,
  initialCall = false
) => {
  const savedCallback = useRef<any>()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (initialCall) savedCallback.current()
  }, [initialCall, savedCallback])

  useEffect(() => {
    function tick () {
      savedCallback.current()
    }

    const id = setInterval(tick, delay)
    return () => clearInterval(id)
  }, [delay])
}
