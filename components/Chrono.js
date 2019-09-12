import React, { useState, useEffect, useRef } from 'react';
import useInterval from "../hooks/userInterval";

function ChronoComponent(props) {
    const [delay, setDelay] = useState(1000);
    const [isPaused, setPaused] = useState(false);
    const [pauseDuration, setPauseDuration] = useState(0);
    const [count, setCount] = useState(0);
    let timerStarted = useRef(localStorage.getItem(props.id) || Date.now());
    const { label } = props;

    // When coming back on the page after mobile standby, 
    // this allows to readjust the count to the real 
    // difference in time elapsed.
    localStorage.setItem(props.id, timerStarted.current)

    useEffect(() => {
      const now = Date.now()

      const elapsedMs = now - timerStarted.current - pauseDuration;
      const elapsedSec = Math.floor(elapsedMs / 1000)

      setCount(elapsedSec);
    }, []);


    useInterval(() => {
        if (!isPaused) {
          setCount((count) => count + 1);
        }
    }, delay);

    // pause pauses the chrono
    function pause() {
        if (isPaused) {
            setDelay(1000);
        } else {
            // Keep track of time elapsed during pause
            setPauseDuration(pauseDuration + 1);
        }
        setPaused(!isPaused);
    }

    function restart() {
      timerStarted.current = Date.now();

      localStorage.setItem(props.id, timerStarted.current)
      setCount(0);
    }

    function renderTime() {
      const minutes = Math.floor(count / 60);
      const seconds = count % 60;
      let timeElapsed;

      switch(true) {
        case minutes < 1:
          timeElapsed = `${seconds}s`
          break;
        case minutes < 10:
          timeElapsed = `0${minutes}m ${seconds}s`
          break;
        case minutes > 10:
          timeElapsed = `${minutes}m ${seconds}s`
          break;
      }

      return timeElapsed;
    }

    return (
        <div>
          <div className="chrono"><span className="count">{renderTime()}</span> <span className="label" >{ label }</span></div>
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
        <ChronoComponent id={c.id} label={c.label} />
        <button onClick={() => remove(c.id)} className="chronoList-remove">Remove</button>
      </li>
    )
  })

  function add() {
    const newId = String(Math.random() * 1E6).split('.').join('-');
    const label = () => document.querySelector('.chronoLabel');

    setChronos([...chronos, { id: newId, label: label().value.trim() }])
    return newId;
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