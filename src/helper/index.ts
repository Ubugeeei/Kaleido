export const getUniqueKey = (strong = 1000): string =>
	new Date().getTime().toString(16) +
	Math.floor(strong * Math.random()).toString(16);

export const omit = <T extends object, U extends keyof T>(
	item: T,
	elms: U[]
): Omit<T, U> =>
	// @ts-ignore
	elms.reduce((x, y) => (({ [y]: _d, ...rest }) => rest)(x), item);

export const shallowEqualArray = (a: unknown[], b: unknown[]): boolean => {
	if (a.length !== b.length) return false;
	for (let i = 0;i < a.length;i++) {
		if (a[i] !== b[i]) return false;
	}
	return true;
}