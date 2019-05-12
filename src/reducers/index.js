import { combineReducers } from 'redux';

import categories from './categories';
import loading from './loading';
import posts from './posts';

export default combineReducers({ categories, loading, posts });
