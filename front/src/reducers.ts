import { combineReducers } from "redux";
import { tokenReducer } from "./reducer/tokenReducer";
import { decodedReducer } from "./reducer/decodedReducer";
import { IDecoded, IUser, IPhoto, IEvent} from "./interfaces";
import { usersReducer } from "./reducer/usersReducer";
import { photosReducer } from './reducer/photosReducer';
import { eventReducer } from "./reducer/eventsReducer";
import { searchReducer } from './reducer/searchReducer';


export interface IGlobalState {
  token: string;
  decoded: IDecoded;
  users: IUser[];
  photos: IPhoto[];
  events: IEvent[];
  search: string;
  
}

export const reducers = combineReducers({
  token: tokenReducer,
  decoded: decodedReducer,
  users: usersReducer,
  photos: photosReducer,
  events: eventReducer,
  search: searchReducer
  
});
