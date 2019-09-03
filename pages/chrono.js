import React, { useState, useEffect, useRef } from 'react';
import useInterval from "../hooks/userInterval";

function ChronoComponent() {
    const [count, setCount] = useState(0);
    const [delay, setDelay] = useState(1000);

    useInterval(() => {
        setCount(count + 1);
    }, delay);

    function pause() {
        console.log("paused clickd")
        setDelay(null);
    }

    return (
        <div>
            <div className="chrono">{count}</div>
            <button onClick={pause} className="pause">Pause</button>
        </div>
    )
}

export default ChronoComponent;