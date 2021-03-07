/**
 * Loads a script from a third party uri
 * Based on https://usehooks.com/useScript/
 * @author mtownsend
 * @since March 07, 2021
 * @flow
 **/

import { useState, useEffect } from 'react';

type LoadStatus = 
  'idle' |
  'loading' |
  'ready' |
  'error';


const useScript = (src:string): LoadStatus => {
  const [ status, setStatus ] = useState<LoadStatus>(src ? 'loading' : 'idle');

  useEffect(() => {
    // Allow falsy src value if waiting on other data needed for
    // constructing the script URL passed to this hook.
    if (!src) {
      setStatus('idle');
      return;
    }

    // Fetch existing script element by src
    // It may have been added by another intance of this hook
    let script = document.querySelector(`script[src="${src}"]`);

    // Update state here, and in on the script element
    // This can be read by other instances of this hook
    const onScriptEvent = (event: Event) => {
      script && script.setAttribute(
        'data-status',
        event.type === 'load' ? 'ready' : 'error',
      );
      setStatus(event.type === 'load' ? 'ready' : 'error');
    };

    if (!script) {
      // Create script
      script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.setAttribute('data-status', 'loading');
      // Add script to document body
      document.body?.appendChild(script);

    } else {
      // Grab existing script status from attribute and set to state.
      // $FlowIgnore[incompatible-call] I know this will always be a LoadStatus value
      setStatus(script.getAttribute('data-status') || 'idle');
    }

    // Add event listeners
    script.addEventListener('load', onScriptEvent);
    script.addEventListener('error', onScriptEvent);

    // Remove event listeners on cleanup
    return () => {
      if (script) {
        script.removeEventListener('load', onScriptEvent);
        script.removeEventListener('error', onScriptEvent);
      }
    };
  }, [ src ]);

  return status;
};

export default useScript;