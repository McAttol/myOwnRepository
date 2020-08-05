import actionTypes from './actionTypes';
import dispatcher from './../AppDispatcher';
import THEMES_LIST from './../mockdata/Themes';
import getApiData from './../api';

export function loadThemes(){
    let result = THEMES_LIST

    dispatcher.dispatch({
        type: actionTypes.GET_THEMES,
        data: result
    })
}

export function loadTopThemes(){
    let result = THEMES_LIST.slice(0,5);
    
    dispatcher.dispatch({
        type: actionTypes.GET_TOP_THEMES,
        data: result
    })
}

export async function loadSessionSet(category, difficulty, type, encode, amount){
    console.log('ACTION CALLED with params: ', category, difficulty, type, encode, amount);
    let result =  await getApiData(category, difficulty, type, encode, amount);
    console.log('action has received following data form API:', await result);
    
    dispatcher.dispatch({
        type: actionTypes.GET_SESSION_SET,
        data: await result
    })
}