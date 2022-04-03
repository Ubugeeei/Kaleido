# Usage

edit on playground App.ts or components!

```ts
// playground/App.ts
import ReactDOM from "~/src/react-dom";
import { useEffect, useState } from "~/src/hooks";

import MyComponent from "./components/MyComponent";

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

	return ReactDOM.createElement("div", {}, [
		ReactDOM.createElement("h1", {}, [`Count: ${count}`]),
		ReactDOM.createElement(
			"button",
			{ onclick: () => setCount(count + 1) },
			["+"]
		),
		MyComponent({ myProps: myList }),
	]);
};

ReactDOM.render(App, document.getElementById("root-element"));
```

```sh
$ yarn
$ yarn start
```
