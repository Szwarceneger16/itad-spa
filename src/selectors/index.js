import { 
    useSelector
} from 'react-redux';

// const GetUserRoles = state => { 
//     return ["user"].concat((state.auth.user && state.auth.user.role ?? [] )); 
// };



const GetLogginStatus = () => { 
    let isLogged = useSelector( state => state.auth.isLoggedIn);
    return isLogged; 
};

const GetUserRoles = () => { 
    const isLogged = GetLogginStatus();
    let userRoles = useSelector( (state) => ((state.auth.user && state.auth.user.role) ?? [] ))
    return isLogged ? ["user"].concat(userRoles) : []; 
};

export {
    GetUserRoles,
    GetLogginStatus
};