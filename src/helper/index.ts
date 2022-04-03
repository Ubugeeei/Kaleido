export const getUniqueKey = (strong = 1000): string =>
	new Date().getTime().toString(16) +
	Math.floor(strong * Math.random()).toString(16);
