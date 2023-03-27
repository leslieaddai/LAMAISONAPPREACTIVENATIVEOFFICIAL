import { types } from '../actiontypes'

export const setToast = (status, message, duration) => dispatch => {
	try {

		dispatch({
			type: types.SHOW_TOAST, payload: {
				status,
				message,
				duration
			}
		})
	} catch (error) {
		console.log('error', error)
	}
}

export const clearToast = () => dispatch => {
	dispatch({ type: types.HIDE_TOAST })
}
