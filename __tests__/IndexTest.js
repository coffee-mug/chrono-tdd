import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { ChronoComponent, ChronoListComponent } from '../components/Chrono';

let container = null;

const MINUTE = 60000;
const SECOND = 1000;
const ADD_BUTTON = 'button.chronoList-add';
const PAUSE_BUTTON = 'button.pause';
const RESTART_BUTTON = 'button.restart';
const RESET_BUTTON = 'button.reset';
const CHRONO_ITEM = '.chrono';
const CHRONO_COUNT = '.chrono .count'
const CHRONO_INPUT_LABEL = 'input.chronoLabel'
const CHRONO_LABEL = '.label'

jest.useFakeTimers();

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

  localStorage.clear();
});


// Utils
function assertSecondsDisplayed(domElement, elapsed) {
    return expect(domElement.textContent).toEqual(elapsed + "s"); 
}

function assertChronosStoredCount(expectedCount) {
  expect(JSON.parse(localStorage.getItem('chronos')).length).toEqual(expectedCount);
}

function assertChronoCountOnPage(expectedCount) {
  const chronosOnPage = container.querySelectorAll(CHRONO_ITEM)

  expect(chronosOnPage.length).toEqual(expectedCount);
}

function assertChronosCount(expectedCount) {
  assertChronoCountOnPage(expectedCount)
  assertChronosStoredCount(expectedCount)

}

function storedChronos() {
  return JSON.parse(localStorage.getItem('chronos') || "[]");
}

function clickButton(btnSel) {
  const btn = container.querySelector(btnSel)

  act(() => {
    btn.click();
  })
}

function wait(duration) {
  act(() => {
    // To update the interval
    jest.advanceTimersByTime(duration);
  })
}


test('Display count of seconds elapsed correctly',() => {
    let timeElapsed = 0;
    localStorage.clear();

    act(() => {
      render(<ChronoListComponent chronos={[]}/>, container);
    })

    clickButton(ADD_BUTTON)

    wait(4 * SECOND);
    assertSecondsDisplayed(container.querySelector(CHRONO_COUNT), 4)

    wait(6 * SECOND);
    assertSecondsDisplayed(container.querySelector(CHRONO_COUNT), 10)

    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
    expect(setInterval).toHaveBeenCalledTimes(1);
})

test('Click on pause stops the chrono', () => {
  act(() => {
    render(<ChronoListComponent chronos={[]}/>, container);
  })

  clickButton(ADD_BUTTON)

  wait(1* SECOND)

  clickButton(PAUSE_BUTTON)

  assertChronosCount(1);

  // Saved in localStorage ? 
  const parsedChronos = storedChronos();
  expect(parsedChronos[0].state.isPaused).toBe(true);

  assertSecondsDisplayed(container.querySelector(CHRONO_COUNT), 1)
})

test('on pause, pause button has label "Restart"', () => {
  act(() => {
    render(<ChronoComponent />, container);
  })

  clickButton(PAUSE_BUTTON)

  expect(container.querySelector(PAUSE_BUTTON).textContent).toEqual("Restart"); 
})

test('when paused, clicking on restart starts the chrono again', () => {
  act(() => {
    render(<ChronoListComponent chronos={[]}/>, container);
  })

  clickButton(ADD_BUTTON);

  wait(1 * SECOND);

  // Pausing the chrono after 1 second
  clickButton(PAUSE_BUTTON)

  assertChronosCount(1);

  let parsedChronos = storedChronos();
  expect(parsedChronos[0].state.isPaused).toBe(true);

  // Restarting
  clickButton(PAUSE_BUTTON)

  assertChronosCount(1);

  parsedChronos = storedChronos();
  expect(parsedChronos[0].state.isPaused).toBe(false);

  wait(1 * SECOND);

  assertSecondsDisplayed(container.querySelector(CHRONO_COUNT), 2)
})

test('Click on reset button resets the chrono', () => {
  act(() => {
    render(<ChronoListComponent chronos={[]}/>, container);
  })

  clickButton(ADD_BUTTON);

  wait(1 * SECOND);

  assertSecondsDisplayed(container.querySelector(CHRONO_COUNT), 1)

  clickButton(RESET_BUTTON)
  const timestampOnReset = Date.now();

  assertSecondsDisplayed(container.querySelector(CHRONO_COUNT), 0)

  const parsedChronos = storedChronos();

  assertChronosCount(1)
  // 10ms approximation
  expect(parsedChronos[0].state.started).toBeGreaterThanOrEqual(timestampOnReset - 10)
  expect(parsedChronos[0].state.started).toBeLessThanOrEqual(timestampOnReset + 10)

})

test('Can render a list of chronos', () => {
  const chronos = [
    { id: "0X56435678", state: { isPaused: false, label: '', started: 1568564128285 }},
    { id: "0X56436678", state: { isPaused: false, label: '', started: 1568564128285 }},
    { id: "0X56437678", state: { isPaused: false, label: '', started: 1568564128285 }},
  ];

  act(() => {
    render(<ChronoListComponent chronos={chronos}/>, container);
  })

  assertChronosCount(3)
})

test('Can add a chrono to the list by clicking the add button', () => {
  act(() => {
    render(<ChronoListComponent chronos={[]}/>, container);
  })

  // Empty list at startup
  assertChronosCount(0)

  clickButton(ADD_BUTTON)

  // Saved to localStorage
  assertChronosCount(1)
})

test('Can remove a chrono from the list by clicking its remove button', () => {
  const chronos = [
    { id: "0X56435678", state: { isPaused: false, label: '' }},
  ];

  localStorage.clear();

  act(() => {
    render(<ChronoListComponent chronos={chronos}/>, container);
  })

  // advance to create a differentiation between timers
  wait(10 * SECOND);

  clickButton(ADD_BUTTON);

  wait(5 * SECOND);

  clickButton(ADD_BUTTON);

  // Remove second chrono, to test that the two other items
  // keep their state
  const REMOVE_SECOND_CHRONO_BUTTON = 'li:nth-child(2) button.chronoList-remove'
  clickButton(REMOVE_SECOND_CHRONO_BUTTON)
  
  const chronosOnPage = container.querySelectorAll(CHRONO_ITEM);

  assertChronosCount(2);
  assertSecondsDisplayed(chronosOnPage[0].querySelector(CHRONO_COUNT), 15)
  assertSecondsDisplayed(chronosOnPage[1].querySelector(CHRONO_COUNT), 0)
});

test('Can create a chrono with a label', () => {
  // Empty list at first
  act(() => {
    render(<ChronoListComponent chronos={[]}/>, container);
  })

  const labelField = () => container.querySelector(CHRONO_INPUT_LABEL);

  act(() => {
    labelField().value = "My Label"
  })

  clickButton(ADD_BUTTON);

  const chronosOnPage = container.querySelectorAll(CHRONO_ITEM)

  assertChronosCount(1)

  expect(chronosOnPage[0].querySelector(CHRONO_LABEL).textContent.trim()).not.toBeNull();
  expect(chronosOnPage[0].querySelector(CHRONO_LABEL).textContent.trim()).toEqual(labelField().value.trim());
})

test('Display minutes elapsed', () => {
  // Empty list at first
  act(() => {
    render(<ChronoListComponent chronos={[]}/>, container);
  })

  clickButton(ADD_BUTTON);

  wait(1 * MINUTE + 30 * SECOND)

  const chrono = container.querySelector(CHRONO_ITEM);
  expect(chrono.querySelector(CHRONO_COUNT).textContent).toEqual("01m 30s");
})

test('Chrono starting times persists after unmount', () => {
  act(() => {
    render(<ChronoListComponent chronos={[]}/>, container);
  })

  // The component use Date.now(), so mock it to allow
  // assertions  
  // For an unknown reason there seems to have a 1ms latency
  // between the date and the moment it gets saved in localStorage.
  const now = 1568377542026
  jest
    .spyOn(global.Date, 'now')
    .mockImplementationOnce(() => now)
  

  const buttonAddedAt = Date.now();
  clickButton(ADD_BUTTON);

  const chrono = container.querySelector(CHRONO_ITEM);
  const chronoId = Object.keys(localStorage.__STORE__)[0];

  assertChronosCount(1);

  const parsedChronos = storedChronos();

  expect(parsedChronos[0].state.started).toBeGreaterThanOrEqual(buttonAddedAt);
  // 10 ms aproximation
  expect(parsedChronos[0].state.started).toBeLessThanOrEqual(buttonAddedAt + 10);

  // Should unmount the component, rerender the component
  // with the previous id and see if the time displayed is right.
  unmountComponentAtNode(container);

  assertChronosStoredCount(1)
  expect(parsedChronos[0].state.started).toBeGreaterThanOrEqual(buttonAddedAt);
  // 10 ms aproximation
  expect(parsedChronos[0].state.started).toBeLessThanOrEqual(buttonAddedAt + 10);
})

test('Correctly render time elapsed from previously saved chronos', () => {
  const previousDate = Date.now() - 10 * SECOND;

  // Chrono saved from a previous navigation
  const parsedChronos = storedChronos(); 

  parsedChronos.push({ id: '15609098089-98080808987', state: { isPaused: false, started: previousDate, label: '' }})

  localStorage.setItem('chronos', JSON.stringify(parsedChronos));

  act(() => {
    render(<ChronoListComponent chronos={[]}/>, container);
  })

  const chrono = container.querySelector(CHRONO_ITEM);

  wait(10 * SECOND)

  expect(chrono).not.toBe(null);
  assertSecondsDisplayed(chrono.querySelector(CHRONO_COUNT), 20)
})
