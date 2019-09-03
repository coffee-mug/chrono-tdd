import React, { useState, useEffect, useRef } from 'react';
import useInterval from "../hooks/userInterval";

function ChronoComponent() {
    const [count, setCount] = useState(0);
    const [delay, setDelay] = useState(1000);
    const [isPaused, setPaused] = useState(false);

    useInterval(() => {
        setCount(count + 1);
    }, delay);

    function pause() {
        setDelay(null);
        setPaused(!isPaused);
    }

    function restart() {
        setCount(0);
    }

    return (
        <div>
            <div className="chrono">{count}</div>
            <button onClick={pause} className="pause">{ isPaused ? 'Restart' : 'Pause' }</button>
            <button onClick={restart} className="restart"></button>
        </div>
    )
}

export default ChronoComponent;