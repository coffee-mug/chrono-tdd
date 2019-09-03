import React, { useState, useEffect, useRef } from 'react';

function useInterval(callback, delay) {
    const [count, setCount] = useState(0);
    const savedCallback = useRef(null)

    useEffect(() => {
      savedCallback.current = callback;
    })

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      
      if (delay !== null) {
        let id = setInterval(tick, delay)

        return () => {
            clearInterval(id);
        }
      }
    }, [delay]);
}

export default useInterval;