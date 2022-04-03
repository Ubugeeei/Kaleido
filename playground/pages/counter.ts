import ReactDOM from "~/src/core/dom";
import { useState, useMemo, useEffect } from "~/src/core/hooks";
import { THEME, utilStyles } from "~/playground/style/util";
import { ReactStyleSheet } from "~/src/core/style";

const Counter = () => {
	const [count, setCount] = useState(0);
	const [count2, setCount2] = useState(0);

	const count2Double = useMemo(() => {
		console.debug("useMemo: count2Double calculated");
		return count2 * 2;
	}, [count2]);

	const resetCounts = () => {
		setCount(0);
		setCount2(0);
	};

	useEffect(() => {
		console.debug("useEffect: Effect only mounted");
	}, []);

	useEffect(() => {
		console.debug("useEffect: Effect only updated count");
	}, [count]);

	return ReactDOM.createElement(
		"div",
		{ id: "pages-counter", key: "pages-counter" },
		[
			ReactDOM.createElement("h3", {}, ["Counter App"]),
			ReactDOM.createElement("div", { style: utilStyles.flex }, [
				ReactDOM.createElement(
					"button",
					{
						onclick: () => setCount(count + 1),
						style: styles.incrementButton + utilStyles.mr4,
					},
					["+"]
				),
				ReactDOM.createElement("p", {}, [
					ReactDOM.createElement("span", { style: styles.label }, [
						"count: ",
					]),
					ReactDOM.createElement("span", {}, [`${count}`]),
				]),
			]),

			ReactDOM.createElement("div", { style: utilStyles.flex }, [
				ReactDOM.createElement(
					"button",
					{
						onclick: () => setCount2(count2 + 1),
						style:
							utilStyles.mr4 +
							styles.incrementButton +
							utilStyles.mr4,
					},
					["+"]
				),
				ReactDOM.createElement("p", {}, [
					ReactDOM.createElement("span", { style: styles.label }, [
						"count2: ",
					]),
					ReactDOM.createElement("span", {}, [`${count2}`]),
				]),
			]),

			ReactDOM.createElement("div", { style: utilStyles.flex }, [
				ReactDOM.createElement(
					"button",
					{
						style: styles.incrementButtonDisabled + utilStyles.mr4,
						disabled: true,
					},
					["+"]
				),
				ReactDOM.createElement("p", {}, [
					ReactDOM.createElement("span", { style: styles.label }, [
						"double: ",
					]),
					ReactDOM.createElement("span", {}, [`${count2Double}`]),
				]),
			]),

			ReactDOM.createElement(
				"div",
				{ style: utilStyles.flex + utilStyles.justifyEnd },
				[
					ReactDOM.createElement(
						"button",
						{ onClick: resetCounts, style: styles.resetCountButton },
						["reset counts"]
					),
				]
			),
		]
	);
};

const styles = ReactStyleSheet.create({
	incrementButton: {
		height: "20px",
		width: "20px",
		border: "none",
		background: THEME.primary,
		color: "#fff",
		"border-radius": ".25rem",
	},
	incrementButtonDisabled: {
		height: "20px",
		width: "20px",
		border: "none",
		background: "#ccc",
		color: "#fff",
		"border-radius": ".25rem",
	},
	resetCountButton: {
		padding: ".5rem",
		border: "none",
		background: THEME.secondary,
		color: "#fff",
		"font-weight": "bold",
		"border-radius": ".25rem",
	},
	label: {
		"font-size": ".8rem",
	},
});

export default Counter;
