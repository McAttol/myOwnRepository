import { EventEmitter } from 'events';
import dispatcher from './../AppDispatcher';
import actionTypes from './../actions/actionTypes';

const CHANGE_EVENT = 'change';
let _question = {};

class QuestionStore extends EventEmitter{

    addChangeListener(callback){
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback){
        this.removeListener(CHANGE_EVENT, callback);
    }

    emitChange(){
        this.emit(CHANGE_EVENT);
    }

    getQuestion(){
        return _question;
    }

}

const questionStore = new QuestionStore();

export default questionStore;

dispatcher.register((action) => {
    switch (action.type){
        case actionTypes.GET_QUESTION:
            _question = action.data;
            gameStore.emitChange(_question);
            break;
        default:
            break;
    }    
})
