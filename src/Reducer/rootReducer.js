const initialState = {
    allposts:[],
    username:"",
    screen:1,
    userpicpath:""
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
        case 'SET_USERPIC':
            return{
                ...state,
                userpicpath:action.userpicpath
            }
    }
    
    return state;
}


export default rootReducer;