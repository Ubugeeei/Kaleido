import { h } from "../src/createElement";
import { render } from "../src/render";
import { useState } from "./hooks/useState";
import TodoList from "./Todos";

interface HTMLElementEvent<T extends HTMLElement> extends Event {
	target: T;
}

export interface Todo {
	title: string;
}

const App = () => {
	const [todos, setTodos] = useState<Todo[]>([], "todos");
	const [inputVal, setValue] = useState("default", "inputVal");

	return h("div", {}, [
		h(
			"input",
			{
				type: "text",
				value: inputVal,
				// prettier-ignore
				oninput: (e: HTMLElementEvent<HTMLInputElement>) => setValue(e.target.value),
				autofocus: true,
			},
			[]
		),

		h(
			"button",
			{
				onclick: () => setTodos([...todos, { title: inputVal }]),
			},
			["submit"]
		),

		h("p", {}, [`input state: ${inputVal}`]),

		TodoList({ todos }),
	]);
};

render(App(), document.getElementById("root-element"));

export default App;
