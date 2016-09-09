/**
 * @author happyhaha
 * Created on 2016-09-08 17:43
 */
import { combineReducers } from 'redux'
import counter from './counter'

//使用redux的combineReducers方法将所有reducer打包起来
const rootReducer = combineReducers({
    counter
});

export default rootReducer