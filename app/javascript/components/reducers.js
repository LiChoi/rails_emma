import { combineReducers } from 'redux'
import {VIEW_DRUG, UPDATE_LIBRARY, SET_DRUG_DETAILS} from './actions'  

export const initialState = {
    drugs: [],
    drug: {
        chemicalName: "",
        drug_class: "",
        trade_names: [],
        cross_allergies: [],
        interactions: []
    },
    viewDrugID: false
}

function drugListHandler(state = initialState.drugs, action){
    switch(action.type){
        case UPDATE_LIBRARY:
            return action.drugs
        default: 
            return state
    }
}

function viewDrugHandler(state = initialState.viewDrugID, action){
    switch(action.type){
        case VIEW_DRUG:
            return action.viewDrugID
        default: 
            return state
    }
}

function drugDetailsHandler(state=initialState.drug, action){
    switch(action.type){
        case SET_DRUG_DETAILS:
            return action.drug
        default: 
            return state
    }
}

export const rootReducer = combineReducers({
    drugs: drugListHandler,
    drug: drugDetailsHandler,
    viewDrugID: viewDrugHandler
})

//export default rootReducer