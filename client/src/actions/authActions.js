import axiosInstance from "../utils/axios";
import * as C from '../constants/constants'

export function logout() {
	return async (dispatch) => {
		dispatch({ type: C.LOGOUT_REQ })

		axiosInstance.put('/auth/token/revoke')
			.then(res => {
				if (res.status === 200) {
					localStorage.removeItem('user')
					localStorage.removeItem('accessToken')
					dispatch({ type: C.LOGOUT_REQ_SUCCESS })
				}
			})
			.catch(error => {
				dispatch({ type: C.LOGOUT_REQ_FAILED })
			})
	}
}

export function login(username, password) {
	if (!username || !password) {
		return (dispatch) => {
			dispatch({
				type: C.SET_ERROR,
				payload: "Username and Password are required."
			})
		}
	} else {
		return async (dispatch) => {
			dispatch({ type: C.LOGIN_REQ })
			axiosInstance.post('/auth/login', { username, password })
				.then( res => res.data )
				.then( data => {
					localStorage.setItem( 'accessToken' ,JSON.stringify(data.accessToken))
					localStorage.setItem( 'user', JSON.stringify(data.user))
					dispatch({
						type: C.LOGIN_REQ_SUCCESS
					})
				})
				.catch(error => {
					if(error.response.status === 400 || error.response.status === 404 ){
						dispatch({
							type: C.SET_ERROR,
							payload: error.response.data.message
						})
					}
					dispatch({ type: C.LOGIN_REQ_FAILED })
				})
			}
	}
}