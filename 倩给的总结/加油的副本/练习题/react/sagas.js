import {put ,call,take,fork} from 'redux-saga/effects';
import {takeEvery,takeLatest} from 'redux-saga'

export const delay = ms => new Promise((resolve) => {
	setTimeout(resolve,ms)
});

function* incrementAsync(){
	// 延迟1秒在执行+1的操作
	yield call(delay,1000);
	yield put({type:'INCREMENT'})
}

export default function * rootSaga(){
	yield * takeEvery('INCREMENT_ASYNC',incrementAsync)
}