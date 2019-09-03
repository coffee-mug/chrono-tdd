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
    pauseButton.dispatchEvent(new MouseEvent('click'), { bubbles: true });
  })

  assertSecondsDisplayedAfter(1000, 1, container.querySelector("div.chrono"))
})