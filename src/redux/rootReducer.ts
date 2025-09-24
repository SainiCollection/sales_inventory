import { combineReducers } from 'redux';
import inventoryReducer from '../modules/inventory/inventorySlice';
import salesReducer from '../modules/sales/salesSlice';
import accountsReducer from '../modules/accounts/accountsSlice';
import authReducer from '../modules/auth/authSlice';

const rootReducer = combineReducers({
  inventory: inventoryReducer,
  sales: salesReducer,
  accounts: accountsReducer,
  auth: authReducer,
});

export default rootReducer;
