import React, { useState } from 'react';
import useInterval from "../hooks/userInterval";

function ChronoComponent() {
    const [count, setCount] = useState(0);
    const [delay, setDelay] = useState(1000);
    const [isPaused, setPaused] = useState(false);

    useInterval(() => {
        setCount(count + 1);
    }, delay);

    // pause pauses the chrono
    function pause() {
        if (isPaused) {
            setDelay(1000);
        } else {
            setDelay(null);
        }
        setPaused(!isPaused);
    }

    function restart() {
        setCount(0);
    }

    return (
        <div>
            <div className="chrono">{count}</div>
            <button onClick={pause} className="pause">{ isPaused ? 'Restart' : 'Pause' }</button>
            <button onClick={restart} className="reset">Reset</button>
        </div>
    )
}

function ChronoListComponent(props) {
  const { chronos }  = props;
  const chronoItems = chronos.map((c, index) => {
    return (
      <li key={index}>{c}</li>
    )
  })
  return (
    <ul>
      {chronoItems} 
    </ul>
  )
}

module.exports = {
  ChronoComponent,
  ChronoListComponent,
}