import ReactDOM from "../src/react-dom/index";
import { useEffect, useMemo, useState } from "../src/hooks/index";
import { ReactStyleSheet } from "../src/style/index";
import TodoApp from "./components/todo/TodoApp";

const App = () => {
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

	/**
	 * render
	 */
	return ReactDOM.createElement(
		"div",
		{ style: styles.appContainer },
		[
			ReactDOM.createElement("h3", {}, ["Counter App"]),
			ReactDOM.createElement("div", { style: styles.flex }, [
				ReactDOM.createElement(
					"button",
					{
						onclick: () => setCount(count + 1),
						style: styles.incrementButton + styles.mr4,
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

			ReactDOM.createElement("div", { style: styles.flex }, [
				ReactDOM.createElement(
					"button",
					{
						onclick: () => setCount2(count2 + 1),
						style: styles.mr4 + styles.incrementButton + styles.mr4,
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

			ReactDOM.createElement("div", { style: styles.flex }, [
				ReactDOM.createElement(
					"button",
					{
						style: styles.incrementButtonDisabled + styles.mr4,
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
				{ style: styles.flex + styles.justifyEnd },
				[
					ReactDOM.createElement(
						"button",
						{ onClick: resetCounts, style: styles.resetCountButton },
						["reset counts"]
					),
				]
			),

			ReactDOM.createElement("hr", {}, []),

			TodoApp(),

			ReactDOM.createElement("hr", {}, []),
		]
	);
};

export const THEME = {
	primary: "#66f",
	secondary: "#fa0",
} as const;

const styles = ReactStyleSheet.create({
	appContainer: {
		"max-width": "600px",
		margin: "8rem auto",
		padding: "1rem",
		height: "100%",
		"min-height": "600px",
		background: "#fafafa",
		color: "#444444",
		border: "2px solid #ccc",
		"border-radius": ".5rem",
	},
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
	// utils
	flex: {
		display: "flex",
		"align-items": "center",
	},
	justifyEnd: {
		"justify-content": "flex-end",
	},
	mr4: {
		"margin-right": "1rem",
	},
});

ReactDOM.render(App, document.getElementById("root-element"));
