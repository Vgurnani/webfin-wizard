const initialState = {
    loading: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
    case 'SET_ACTIVE_SIDEBAR':
        return { ...state, sidebarActive: action.payload };
    default:
        return state;
    }
};