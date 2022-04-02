import ReactDOM from "../src/react-dom/index";
import { useEffect, useMemo, useState } from "../src/hooks/index";
import TodoApp from "./components/todo/TodoApp";

const App = () => {
	const [count, setCount] = useState(0);
	const [count2, setCount2] = useState(0);

	const count2Double = useMemo(() => {
		console.debug("useMemo: count2Double calculated");
		return count2 * 2;
	}, [count2]);

	useEffect(() => {
		console.debug("useEffect: Effect only mounted");
	}, []);

	useEffect(() => {
		console.debug("useEffect: Effect only updated count");
	}, [count]);

	/**
	 * render
	 */
	return ReactDOM.createElement("div", {}, [
		ReactDOM.createElement("h3", {}, ["Counter App"]),
		ReactDOM.createElement("p", {}, [
			ReactDOM.createElement(
				"span",
				{ style: "margin-right: 15px" },
				[`count: ${count}`]
			),
			ReactDOM.createElement(
				"button",
				{ onclick: () => setCount(count + 1) },
				["+"]
			),
		]),

		ReactDOM.createElement("p", {}, [
			ReactDOM.createElement(
				"span",
				{ style: "margin-right: 15px" },
				[`count2: ${count2}`]
			),
			ReactDOM.createElement(
				"button",
				{ onclick: () => setCount2(count2 + 1) },
				["+"]
			),
			ReactDOM.createElement("span", { style: "margin-left: 15px" }, [
				`double: ${count2Double}`,
			]),
		]),

		ReactDOM.createElement("hr", {}, []),

		TodoApp(),

		ReactDOM.createElement("hr", {}, []),
	]);
};

ReactDOM.render(App, document.getElementById("root-element"));
