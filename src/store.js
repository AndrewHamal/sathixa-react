import { configureStore } from '@reduxjs/toolkit'
import token from './reducers/reducers'
import loginReducer from "./reducers/loginReducer";
import locateReducer from "./reducers/locateReducer";
import reducers from "./reducers/reducers";
import riderReducer from "@/reducers/rider/reducers";

const store = configureStore({
    reducer: {
        token : token,
        loginReducer : loginReducer,
        locateReducer : locateReducer,
        reducers : reducers,
        riderReducer : riderReducer
    }
})

export default store