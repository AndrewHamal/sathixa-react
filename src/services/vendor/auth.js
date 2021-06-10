// import {token} from "../../reducers/reducers";
//
// import authClient from "../auth";
//
// export const login = (response) => {
//     localStorage.setItem('_token', response)
//     localStorage.setItem('loggedIn', true);
// };
//
// export const logout = () => {
//     authClient().post('logout')
//         .then( response => {
//             if (response.status === 200) {
//                 localStorage.setItem('loggedIn', false);
//                 setLoggedIn(false)
//             }
//         })
// };
