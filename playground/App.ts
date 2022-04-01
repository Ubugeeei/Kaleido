import ReactDOM from "../src/react-dom/index";
import { useEffect, useState } from "../src/hooks/index";
import TodoApp from "./components/todo/TodoApp";

const App = () => {
	const [count, setCount] = useState(0);

	useEffect(() => {
		console.log("effect!!");
	});

	useEffect(() => {
		console.log("effect only mounted!!");

		return () => {
			console.log("effect only unmounted!!");
		};
	}, []);

	useEffect(() => {
		console.log("effect only updated count!!");
	}, [count]);

	return ReactDOM.createElement("div", {}, [
		ReactDOM.createElement("h3", {}, ["Counter App"]),
		ReactDOM.createElement("p", {}, [`Count: ${count}`]),
		ReactDOM.createElement(
			"button",
			{ onclick: () => setCount(count + 1) },
			["+"]
		),

		ReactDOM.createElement("hr", {}, []),

		TodoApp(),

		ReactDOM.createElement("hr", {}, []),
	]);
};

ReactDOM.render(App, document.getElementById("root-element"));
