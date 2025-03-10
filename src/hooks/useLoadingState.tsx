import { useReducer } from 'react';

type LoadingState = boolean;

type LoadingAction = {
	type: 'SET_LOADING';
	payload: boolean;
};

function loadingReducer(
	state: LoadingState,
	action: LoadingAction,
): LoadingState {
	switch (action.type) {
		case 'SET_LOADING':
			return action.payload;
		default:
			return state;
	}
}

export const useLoadingState = (
	initialState: boolean = false,
): [boolean, (loading: boolean) => void] => {
	const [state, dispatch] = useReducer(loadingReducer, initialState);

	const setLoading = (loading: boolean) => {
		dispatch({ type: 'SET_LOADING', payload: loading });
	};

	return [state, setLoading];
};
