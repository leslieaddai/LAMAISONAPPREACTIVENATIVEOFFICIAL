import { types } from '../actiontypes'

const initialState = {
	isToastShowing: false,
	config: {}
}

 const toastReducer = (toast = initialState, action) => {
	switch (action.type) {
		case types.SHOW_TOAST:
			return { ...toast, isToastShowing: true, config: action.payload }
		case types.HIDE_TOAST:
			return { ...toast, isToastShowing: false, config: {} }
		default:
			return toast
	}

}
export default toastReducer