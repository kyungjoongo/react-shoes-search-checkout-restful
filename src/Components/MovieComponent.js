import React, {Component} from 'react';
import '../App.css';
import {RaisedButton} from 'material-ui'
import {createStore, combineReducers, applyMiddleware} from 'redux'

const userReducer = (state = {}, actions) => {

    switch (actions.type) {
        case  'CHANGE_NAME':
            state = {...state, name: actions.payload}
            break;

        case  'CHANGE_AGE':
            state.age = actions.payload;
            break;
        case 'E' :
            throw new Error("AAAAAAAA!!!!!!");

    }

    return state;
};

const logger = (store) => (next) => (action) => {
    console.log('action fired', action);
}

const error = (store) => (next) => (action) => {
    try {
        next(action)
    }catch (e){
        console.log("ahhh!!!!!!"+ e)
    }
}

const middleWare = applyMiddleware(logger, error);

const tweetReducer = (state = [], actions) => {

    return state;
};

const reducers = combineReducers({
    user: userReducer,
    tweets: tweetReducer,
});


let store = createStore(reducers,middleWare);

class MovieComponent extends Component {
    constructor() {
        super();
        store.subscribe(() => {
            /*console.log(store.getState())*/
        })

        store.dispatch({
            type: "CHANGE_NAME", payload: 'will'
        })
        store.dispatch({
            type: "CHANGE_AGE", payload: 35
        })

        store.dispatch({
            type: "CHANGE_AGE", payload: 40
        })

        store.dispatch({
            type: "CHANGE_NAME", payload: '고경준 천재'
        })

       /* store.dispatch({
            type: "E", payload: '고경준 천재33333333333333'
        })*/

        console.log(store.getState());

    }

    increment222() {
        console.log("INCREMENT1");
        store.dispatch({
            type: 'INCREMENT',
            payload: 1
        })


    }

    displayState() {
        console.log(store.getState());
    }


    decrement() {
        console.log("decrement");
        store.dispatch({
            type: 'DECREMENT',
            payload: 1
        })
    }


    render() {
        return (
            <div className='test001'>
                <br/>
                <br/>
                <br/>
                <br/>
                <RaisedButton onClick={() => this.increment222()} backgroundColor={'blue'} label={'increment'}/>
                <br/>
                <br/>
                <RaisedButton onClick={() => this.decrement()} backgroundColor={'red'} label={'decrement'}/>
                <br/>
                <br/>
                <RaisedButton onClick={() => this.displayState()} backgroundColor={'green'} label={'displayState'}/>

            </div>
        );
    }
}

export default MovieComponent;
