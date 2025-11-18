import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';

// Import slices
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import contentReducer from './slices/contentSlice';
import analyticsReducer from './slices/analyticsSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'ui'], // Only persist auth and ui state
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  content: contentReducer,
  analytics: analyticsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
// Type exports for TypeScript (if using TS)
export const RootState = store.getState;
export const AppDispatch = store.dispatch;
