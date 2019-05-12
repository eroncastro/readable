import { combineReducers } from 'redux';

import loading from './loading';
import posts from './posts';

export default combineReducers({ loading, posts });
