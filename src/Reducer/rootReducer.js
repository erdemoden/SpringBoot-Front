const initialState = {
    allposts:[],
    username:""
}


const rootReducer = (state = initialState,action)=>{

    switch(action.type){
        case 'SET_NAME':
            return{
                ...state,
                username:action.username
            }
    }
    
    return state;
}


export default rootReducer;