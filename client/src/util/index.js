export const charColor = (answer, char, i) =>
	answer.includes(char.toLowerCase())
		? answer.indexOf(char.toLowerCase()) === i
			? "#6aaa64"
			: "#c9b458"
		: "#86888a";

const milisecondsInDay = 1000 * 3600 * 24;

export const dateToWordle = (date) =>
	279 + Math.floor((date - new Date("3/25/2022").getTime()) / milisecondsInDay);
