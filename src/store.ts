import { configureStore } from '@reduxjs/toolkit'

type CounterState = {
    counter: number;
};
export type CounterId = string;

type State = {
    counters: Record<CounterId, CounterState | undefined>;
}

export type incrementAction = {
    type: 'increment',
    payload: {
        counterId: CounterId;
    }
}

export type decrementAction = {
    type: 'decrement',
    payload: {
        counterId: CounterId;
    }
}

type Action = incrementAction | decrementAction;
const initialCounterState: CounterState =  {counter: 0}
const initialState: State = {
    counters:  {},
}

const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case  'increment': {
            const { counterId } = action.payload;
            const correntCounter = state.counters[counterId] ?? initialCounterState;
            return  {
                ...state,
                counters:  {
                    ...state.counters,
                    [counterId]:  {
                        ...correntCounter,
                        counter:  correntCounter.counter + 1
                    }
                }
            }
        }
        case  'decrement':{
            const { counterId } = action.payload;
            const correntCounter = state.counters[counterId] ?? initialCounterState;
            return  {
                ...state,
                counters:  {
                    ...state.counters,
                    [counterId]:  {
                        ...correntCounter,
                        counter:  correntCounter.counter - 1
                    }
                }
            }
        }
        default:
            return  state

    }
}
export const store = configureStore({
  reducer: reducer,
})

export type AppState = ReturnType<typeof store.getState>;

// store.dispatch
// store.subscribe
// store.getState