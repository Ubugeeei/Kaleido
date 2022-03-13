import { h } from "../src/createElement";
import { render } from "../src/render";
import { useState } from "./hooks/useState";
import MyComponent from "./components/MyComponent";

const App = () => {
	const [count, setCount] = useState(0, "count");

	// component props
	const [myList] = useState(
		["item1", "item2", "item3", "item4", "item5"],
		"myList"
	);

	return h("div", {}, [
		h("h1", {}, [`Count: ${count}`]),
		h("button", { onclick: () => setCount(count + 1) }, ["+"]),
		MyComponent({ myProps: myList }),
	]);
};

render(App(), document.getElementById("root-element"));

export default App;
