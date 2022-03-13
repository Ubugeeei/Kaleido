import { h } from "../src/createElement";
import { render } from "../src/render";
import TodoList from "./Todos";

interface HTMLElementEvent<T extends HTMLElement> extends Event {
	target: T;
}

// const useState = (initialValue: any) => {
// 	rootState.todos = initialValue;

// 	const _setState = (newVal: any) => {
// 		rootState.todos = newVal;
// 		App;
// 	};

// 	return [rootState.todos, _setState];
// };
// const rootState: { [key: string | symbol]: any } = {};

const App = (rootState: any) => {
	const { inputVal, todos } = rootState;
	const setTodos = () => {
		render(
			App({ todos: [...todos, { title: inputVal }], inputVal }),
			document.getElementById("app-container")
		);
	};

	const onHandleInput = (val: string) => {
		render(
			App({ inputVal: val, todos }),
			document.getElementById("app-container")
		);
	};

	// const [todos, setTodos] = useState([]);
	// const [inputVal, setInputVal] = useState([]);

	return h("div", { id: "root-element" }, [
		h(
			"input",
			{
				type: "text",
				value: inputVal,
				oninput: (e: HTMLElementEvent<HTMLInputElement>) =>
					onHandleInput(e.target.value),
				autofocus: true,
			},
			[]
		),

		h(
			"button",
			{
				onclick: () => setTodos(),
			},
			["submit"]
		),

		h("h1", {}, [`state: ${inputVal}`]),

		TodoList({ todos }),
	]);
};

render(
	App({ inputVal: "", todos: [] }),
	document.getElementById("app-container")
);
