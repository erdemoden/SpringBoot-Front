const initialState = {
    allposts:[],
    username:"",
    screen:1,
    userpicpath:"",
    jwtsession:""
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
        case 'SET_JWTSESSION':
            return{
                ...state,
                jwtsession:action.jwtsession
            }
    }
    
    return state;
}


export default rootReducer;