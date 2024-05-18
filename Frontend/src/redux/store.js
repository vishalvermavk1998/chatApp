import {configureStore} from "@reduxjs/toolkit"
import conversationReducer from './conversationSlice.js'


const store = configureStore({
    reducer: {
        conversation : conversationReducer
    },
})

export default store;