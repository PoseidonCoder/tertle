export const charColor = (answer, char, i) =>
	answer.includes(char.toLowerCase())
		? answer.indexOf(char.toLowerCase()) === i
			? "#6aaa64"
			: "#c9b458"
		: "#86888a";

const milisecondsInDay = 1000 * 3600 * 24;

export const dateToWordle = (date) =>
	279 + Math.floor((date - new Date("3/25/2022").getTime()) / milisecondsInDay);

export const createReducer =
	(initialState, handlers, extra = {}) =>
	(state = initialState, action) =>
		handlers.hasOwnProperty(action.type)
			? handlers[action.type](state, action, extra)
			: state;

export const updateObject = (oldObject, newObject) =>
	Object.assign({}, oldObject, newObject);

export const createNamedWrapperReducer =
	(reducerFunction, reducerName) => (state, action) => {
		if (action.name !== reducerName && state !== undefined) return state;
		return reducerFunction(state, action);
	};
