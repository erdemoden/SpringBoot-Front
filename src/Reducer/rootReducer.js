const initialState = {
    allposts:[],
    username:"",
    screen:1,
}


const rootReducer = (state = initialState,action)=>{

    switch(action.type){
        case 'SET_NAME':
            return{
                ...state,
                username:action.username
            }
        case 'SET_SCREEN':
            return{
                ...state,
                screen:action.screen
            }
    }
    
    return state;
}


export default rootReducer;