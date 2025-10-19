import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
import { appApi } from "../api/appApi";
import authReducer from "../slices/authSlice";


export const store  = configureStore({
  reducer: {
    auth: authReducer,

    [authApi.reducerPath]: authApi.reducer,
    [appApi.reducerPath]: appApi.reducer,

  },

  middleware : (getDefaultMiddleware) =>{
    return getDefaultMiddleware().concat(
      authApi.middleware,
      appApi.middleware
        
    )
  }

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;