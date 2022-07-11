import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import citaReducer from '../features/quote/citaSlice'




export function renderRedux(component:  React.ReactNode, state={ cita:{ data:null, estado:0 } } ){

    const store = configureStore({
        reducer: {
          cita: citaReducer,
        },
        preloadedState: state,
    });

    return {
        ...render(
            <Provider store={store} >
                {component}
            </Provider>
        ),
        store
    }

}