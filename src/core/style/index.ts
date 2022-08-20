interface StyleObjectInput {
	[key: string]: { [property: string]: string };
}

interface StyleObject {
	[key: keyof StyleObjectInput]: string;
}

export const KaleidoStyleSheet = {
	create(o: StyleObjectInput): StyleObject {
		const styles: StyleObject = {};

		Object.keys(o).forEach((key) => {
			styles[key] = "";
			const style = o[key];
			for (const [_key, value] of Object.entries(style)) {
				styles[key] += `${_key}:\x20${value};\x20`;
			}
		});

		return styles;
	},
};
