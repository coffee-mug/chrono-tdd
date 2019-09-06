import React, { useState } from 'react';
import useInterval from "../hooks/userInterval";

function ChronoComponent(props) {
    const [count, setCount] = useState(0);
    const [delay, setDelay] = useState(1000);
    const [isPaused, setPaused] = useState(false);
    const { label } = props;

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
          <div className="chrono"><span className="count">{count}</span> <span className="label" >{ label }</span></div>
            <button onClick={pause} className="pause">{ isPaused ? 'Restart' : 'Pause' }</button>
            <button onClick={restart} className="reset">Reset</button>
        </div>
    )
}

function ChronoListComponent(props) {
  const [chronos, setChronos] = useState(props.chronos);

  const chronoItems = chronos.map(c => {
    return (
      <li key={c.id}>
        <ChronoComponent label={c.label} />
        <button onClick={() => remove(c.id)} className="chronoList-remove">Remove</button>
      </li>
    )
  })

  function add() {
    const newId = String(Math.random() * 1E6).split('.').join('-');
    setChronos([...chronos, { id: newId, label: "My Label" }])
  }

  function remove(id) {
    setChronos(() => {
      return chronos.filter(c => {
        if (c.id !== id) { 
          return c 
        }
      })
    });
  }

  return (
    <div>
      <input type="text" className="chronoLabel" />
      <button onClick={add} className="chronoList-add">Add chrono</button>
      <ul>
        {chronoItems} 
      </ul>
    </div>
  )
}

export {
  ChronoComponent,
  ChronoListComponent,
}