import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import ChronoComponent from '../pages/chrono';

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
    //pauseButton.dispatchEvent(new MouseEvent('click'), { bubbles: true });
    pauseButton.click();
  })

  expect(container.querySelector('button.pause').textContent).toEqual("Restart"); 
})

test('Click on restart resets the chrono', () => {
  act(() => {
    render(<ChronoComponent />, container);
  })

  assertSecondsDisplayedAfter(1000, 1, container.querySelector("div.chrono"))

  const restartButton = container.querySelector('button.restart');

  act(() => {
    restartButton.click();
  })

  expect(container.querySelector('div.chrono').textContent).toEqual("0"); 
})