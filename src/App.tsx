import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AppState, CounterId, decrementAction, incrementAction, store } from './store'
import { useEffect, useReducer, useRef } from 'react'

function App() {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Counter counterId='first'/>
        <Counter counterId='second'/>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

const selectCounter = (state: AppState, counterId: CounterId) => 
  state.counters[counterId];

export function Counter({counterId}: {counterId: CounterId})  {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const lastStateRef = useRef<ReturnType<typeof selectCounter>>();

  useEffect(() => {

    const unsubscribe = store.subscribe(() => {
      const currentState = selectCounter(store.getState(), counterId);
      const lastState = lastStateRef.current;

      if (currentState !==  lastState)  {
        forceUpdate();
      }

      lastStateRef.current  =  currentState;

    });
    
    return unsubscribe;
  }, []);

  const counterState = selectCounter(store.getState(), counterId);

  return (
    <>
    counter {counterState?.counter}
    <button 
      onClick={() => store.dispatch({ type: 'increment', payload: {counterId} } satisfies incrementAction)}>
      increment
    </button>
    <button 
      onClick={() => store.dispatch({ type: 'decrement', payload: {counterId} } satisfies decrementAction)}>
      decrement
    </button>
    <p>
      Edit <code>src/App.tsx</code> and save to test HMR
    </p>
  </>
  )
}
export default App
