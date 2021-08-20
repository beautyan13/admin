import {SAVE_TITLE} from '../index'

//保存title的action
export const createSaveTitleAction = (value) =>{
    return {type:SAVE_TITLE,data:value}
}