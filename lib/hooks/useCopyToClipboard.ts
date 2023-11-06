import copy from 'copy-to-clipboard'
import { useCallback, useEffect, useState } from 'react'

export function useCopyToClipboard(resetInterval = 3000, text: string | null = null) {
  const [isCopied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    if (window !== undefined) {
      copy(text ?? window.location.href)
      setCopied(true)
    }
  }, [text])

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (isCopied && resetInterval) {
      timeout = setTimeout(() => setCopied(false), resetInterval)
    }
    return () => {
      clearTimeout(timeout)
    }
  }, [isCopied, resetInterval])

  return [isCopied, handleCopy] as const
}
