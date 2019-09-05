import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { ChronoComponent, ChronoListComponent } from '../components/Chrono';

jest.useFakeTimers();

let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

function assertSecondsDisplayedAfter(time, elapsed, domElement) {
    act(() => {
        jest.advanceTimersByTime(time);
    })

    expect(domElement.textContent).toEqual(String(elapsed)); 
    return time;
}

test('Display count of seconds elapsed correctly',() => {
    let timeElapsed = 0;

    act(() => {
        render(<ChronoComponent />, container);
    })

    timeElapsed = assertSecondsDisplayedAfter(4000, 4, container.querySelector('div.chrono'))
    timeElapsed = assertSecondsDisplayedAfter(6000, (timeElapsed / 1000) + 6, container.querySelector('div.chrono'))



    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
})

test('Click on pause stops the chrono', () => {
  act(() => {
    render(<ChronoComponent />, container);
  })

  act(() => {
    jest.advanceTimersByTime(1000);
  })

  const pauseButton = container.querySelector('button.pause');

  act(() => {
    //pauseButton.dispatchEvent(new MouseEvent('click'), { bubbles: true });
    pauseButton.click();
  })

  assertSecondsDisplayedAfter(1000, 1, container.querySelector("div.chrono"))
})

test('on pause, pause button has label "Restart"', () => {
  act(() => {
    render(<ChronoComponent />, container);
  })

  const pauseButton = container.querySelector('button.pause');

  act(() => {
    pauseButton.click();
  })

  expect(container.querySelector('button.pause').textContent).toEqual("Restart"); 
})

test('when paused, clicking on restart starts the chrono again', () => {
  act(() => {
    render(<ChronoComponent />, container);
  })

  act(() => {
    jest.advanceTimersByTime(1000);
  })

  const pauseButton = container.querySelector('button.pause');

  // Pausing the chrono after 1 second
  act(() => {
    pauseButton.click();
  })

  // Restarting
  act(() => {
    pauseButton.click();
  })

  assertSecondsDisplayedAfter(1000, 2, container.querySelector("div.chrono"))
})

test('Click on reset button resets the chrono', () => {
  act(() => {
    render(<ChronoComponent />, container);
  })

  assertSecondsDisplayedAfter(1000, 1, container.querySelector("div.chrono"))

  const restartButton = container.querySelector('button.reset');

  act(() => {
    restartButton.click();
  })

  expect(container.querySelector('div.chrono').textContent).toEqual("0"); 
})

test('Can render a list of chronos', () => {
  const chronos = [
    { id: "0X56435678"},
    { id: "0X56436789"},
    { id: "0X56437890"},
  ];

  act(() => {
    render(<ChronoListComponent chronos={chronos}/>, container);
  })

  expect(container.querySelectorAll('.chrono').length).toEqual(3);
})

test('Can add a chrono to the list by clicking the add button', () => {
  act(() => {
    render(<ChronoListComponent chronos={[]}/>, container);
  })

  // Empty list at startup
  expect(container.querySelectorAll('.chrono').length).toEqual(0);

  const addButton = container.querySelector('button.chronoList-add');

  act(() => {
    addButton.click();
  })

  expect(container.querySelectorAll('.chrono').length).toEqual(1);
})

test('Can remove a chrono from the list by clicking its remove button', () => {
  act(() => {
    render(<ChronoListComponent chronos={[<ChronoComponent />]}/>, container);
  })

  // advance to create a differentiation between timers
  act(() => {
    jest.advanceTimersByTime(10000);
  })


  const addButton = container.querySelector('button.chronoList-add');
  act(() => {
    addButton.click();
  })

  act(() => {
    jest.advanceTimersByTime(5000);
  })

  act(() => {
    addButton.click();
  })

  // Remove second chrono, to test that the two other items
  // keep their state
  const secondElemRemoveButton = container.querySelector('li:nth-child(2) button.chronoList-remove');
  act(() => {
    secondElemRemoveButton.click();
  })
  
  const chronos = container.querySelectorAll('.chrono');
  expect(chronos.length).toEqual(2);
  expect(chronos[0].textContent).toEqual("15");
  expect(chronos[1].textContent).toEqual("0");

});