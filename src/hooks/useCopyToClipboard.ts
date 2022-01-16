/*
* Copies the text to the clipboard
*/

import { useCallback, useEffect, useState } from 'react';
import copy from 'copy-to-clipboard';

// Hook borrowed from https://github.com/braydoncoyer/braydoncoyer.dev/blob/v2/lib/hooks/useCopyToClipboard.tsx

// By default will copy URL to clipboard if text is not passed to the hook.
export function useCopyToClipboard(resetInterval = 3000, text: any = null) {
    const [isCopied, setCopied] = useState(false);

    const handleCopy = useCallback(() => {
        if (window !== undefined) {
            copy(text ?? window.location.href);
            setCopied(true);
        }
    }, []);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (isCopied && resetInterval) {
            timeout = setTimeout(() => setCopied(false), resetInterval);
        }
        return () => {
            clearTimeout(timeout);
        };
    }, [isCopied, resetInterval]);

    return [isCopied, handleCopy] as const;
}