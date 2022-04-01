import ReactDOM from "../src/react-dom/index";
import { useEffect, useState } from "../src/hooks/index";
import MyComponent from "./components/MyComponent";

const e = ReactDOM.createElement;

const App = () => {
	const [count, setCount] = useState(0);

	// component props
	const [myList] = useState([
		"item1",
		"item2",
		"item3",
		"item4",
		"item5",
	]);

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

	useEffect(() => {
		console.log("effect only updated myList!!");
	}, [myList]);

	return e("div", {}, [
		e("h1", {}, [`Count: ${count}`]),
		e("button", { onclick: () => setCount(count + 1) }, ["+"]),
		MyComponent({ myProps: myList }),
	]);
};

ReactDOM.render(App, document.getElementById("root-element"));
