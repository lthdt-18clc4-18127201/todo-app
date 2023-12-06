import { useReducer } from 'react';
import Context from './Context';
import reducer, { initialState } from './reducers/reducers';
// import Logger from './Logger';

const Provider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);
    
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}

export default Provider;