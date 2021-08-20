import { SAVE_TITLE } from "..";

let initState = ''
export default function menuReducer(preState = initState,action){
    const{data,type} = action
    let newState
    switch (type) {
        case SAVE_TITLE:
            newState = data
            return newState
        default:
            return preState
    }
}