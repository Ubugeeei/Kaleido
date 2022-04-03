export const getUniqueKey = (strong = 1000): string =>
	new Date().getTime().toString(16) +
	Math.floor(strong * Math.random()).toString(16);

export const omit = <T extends object, U extends keyof T>(
	item: T,
	elms: U[]
): Omit<T, U> =>
	// @ts-ignore
	elms.reduce((x, y) => (({ [y]: _d, ...rest }) => rest)(x), item);
