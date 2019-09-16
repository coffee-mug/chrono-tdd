import React, { useState, useEffect, useRef } from 'react';
import useInterval from "../hooks/userInterval";

function ChronoComponent(props) {
    const [delay, setDelay] = useState(1000);
    const [isPaused, setPaused] = useState(props.isPaused || false);
    const [pauseDuration, setPauseDuration] = useState(0);
    const [count, setCount] = useState(0);
    let timerStarted = useRef(props.started || Date.now());
    const label = props.label || '';

    // original refresh
    useEffect( () => {
      refreshTime();

    }, [])

    useEffect(() => {
      const id = document.addEventListener('visibilitychange', () => {

        if (!document.hidden) {
          refreshTime();
        }
        return function() {
          document.removeEventListener(id);
        }
      })
    }, []);


    useInterval(() => {
        if (!isPaused) {
          setCount((count) => count + 1);
        }
    }, delay);

    function refreshTime() {
      const now = Date.now()

      const elapsedMs = now - timerStarted.current - pauseDuration;
      const elapsedSec = Math.floor(elapsedMs / 1000)

      setCount(elapsedSec);
    }

    // pause pauses the chrono
    function pause() {
        if (isPaused) {
            setDelay(1000);
        } else {
            // Keep track of time elapsed during pause
            setPauseDuration(pauseDuration + 1);
        }
        setPaused(!isPaused);

        const existingChronos = localStorage.getItem('chronos') || "[]"
        const parsedChronos = JSON.parse(existingChronos);

        const thatChrono = parsedChronos.filter( c => {
          // our chrono
          return c.id === props.id;
        })

        // changing state
        if (thatChrono.length === 1) {
          thatChrono[0].state.isPaused = !isPaused;
        }

        localStorage.setItem('chronos', JSON.stringify(parsedChronos));
    }

    function restart() {
      timerStarted.current = Date.now();

      const existingChronos = localStorage.getItem('chronos') || "[]"
      const parsedChronos = JSON.parse(existingChronos);

      const thatChrono = parsedChronos.filter( c => {
        // our chrono
        return c.id === props.id;
      })

      // changing state
      if (thatChrono.length === 1) {
        thatChrono[0].state.started = timerStarted.current;
      }

      localStorage.setItem('chronos', JSON.stringify(parsedChronos));

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

  useEffect(() => {
    const existingChronos = window.localStorage.getItem('chronos')
    const parsedChronos = existingChronos ? JSON.parse(existingChronos) : [];

    setChronos([...chronos, ...parsedChronos ])
    localStorage.setItem('chronos', JSON.stringify([...chronos, ...parsedChronos]))
  }, [])


  function add() {
    const newId = String(Math.random() * 1E6).split('.').join('-');
    const label = () => document.querySelector('.chronoLabel');

    const chronoInfos = {
      id: newId, 
      state: {
        isPaused: false,
        started: Date.now(),
        label: label().value.trim()
      }
    }

    localStorage.setItem('chronos', JSON.stringify([...chronos, chronoInfos]))
    setChronos([...chronos, chronoInfos ])

    return newId;
  }

  function remove(id) {
    const chronosMinusId = chronos.filter(c => {
        if (c.id !== id) { 
          return c 
        }
      })

    setChronos(chronosMinusId);

    localStorage.setItem('chronos', JSON.stringify(chronosMinusId))
  }

  const chronoItems = chronos.map(c => {
    return (
      <li key={c.id}>
        <ChronoComponent id={c.id} label={c.state.label} started={c.state.started} isPaused={c.state.isPaused} />
        <button onClick={() => remove(c.id)} className="chronoList-remove">Remove</button>
      </li>
    )
  })

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