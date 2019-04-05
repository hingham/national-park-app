let initialState = [];

export default (state = initialState, action )=>{
    let {type, payload} = action;

    switch(type){
        case "ADD":
        console.log('new park added', payload);
        console.log('newstate', [...state, payload]);
        return [...state, payload];
    
    default:
    console.log('default state', state)
    return state;
}
}