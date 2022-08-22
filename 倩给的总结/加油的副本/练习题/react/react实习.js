import React from 'react';
import ReactDOM from 'react-dom';
import  { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootSaga from './sagas';
import Counter from './Counter';
import rootReducer from './reducers';

// 创建一个saga中间件实例
const sagaMiddleware = createSagaMiddleware();

// 下面这句话和下面两行代码创建store的方式是一样的
// const store = createStore(reducers,applyMiddlare(middlewares))

const createStoreWithMiddleware = applyMiddleware(middlewares)(createStore);
const store = createStoreWithMiddleware(rootReducer)

sagaMiddleware.run(rootSaga)

const action = type => store.dispatch({type})
function render(){
	ReactDOM.render(
		<Counter 
			value={store.getState()} 
			onIncrement={() => action('INCREMENT')}
			onDecrement={() => action('DECREMENT')}
			onIncrementAsync={() => action('INCREMENT_ASYNC')}
		 />,
		 document.getElementById('root')
	)
}

render();

store.subscribe(render)