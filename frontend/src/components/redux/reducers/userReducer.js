const initialState = {
    username: '',
    role: '',
    balance: 0,
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: {
        country: '',
        provinceState: '',
        unitNumber: '',
        streetNumber: '',
        street: '',
        city: '',
        postalCode: ''
    }
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_INFO':
            return {
                ...state,
                username: action.payload.username || '',
                role: action.payload.role || '',
                balance: action.payload.balance || 0,
                companyName: action.payload.companyName || '',
                contactPerson: action.payload.contactPerson || '',
                email: action.payload.email || '',
                phone: action.payload.phone || '',
                address: {
                    ...state.address,
                    ...(action.payload.address || {})
                }
            };
        default:
            return state;
    }
};

export default userReducer;
