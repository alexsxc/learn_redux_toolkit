import { configureStore } from '@reduxjs/toolkit'

type State = {
    counter: number,

}

export type incrementAction = {
    type: 'increment'
}

export type decrementAction = {
    type: 'decrement'
}

type Action = incrementAction | decrementAction;

const initialState: State = {
    counter: 0
}

const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case  'increment':
            return  {
                ...state,
                counter:  state.counter + 1
            }
        case  'decrement':
            return  {
                ...state,
                counter:  state.counter - 1
            }
        default:
            return  state

    }
}
export const store = configureStore({
  reducer: reducer,
})

// store.dispatch
// store.subscribe
// store.getState