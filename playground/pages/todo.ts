import { useEffect, useState } from "../../src/hooks/index";
import ReactDOM from "../../src/react-dom/index";
import { ReactStyleSheet } from "../../src/style/index";

import { THEME, utilStyles } from "../style/util";
import { getUniqueKey } from "../../src/helper/index";
import TodoItem from "../components/todo/TodoItem";

export interface Todo {
	id: string;
	title: string;
	completed: boolean;
}

const TodoApp = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [title, setTitle] = useState("");
	const [todoId, setTodoId] = useState("");

	const addTodo = () => {
		const newTodoId = getUniqueKey();
		const newTodos = [
			...todos,
			{
				id: newTodoId,
				title,
				completed: false,
			},
		];
		localStorage.setItem("todos", JSON.stringify(newTodos));
		setTodoId(newTodoId);
		setTodos(newTodos);
		setTitle("");
	};

	const toggleTodoStatus = (id: string) => {
		const newTodos = todos.map((todo) =>
			todo.id === id
				? {
						...todo,
						completed: !todo.completed,
				  }
				: todo
		);
		localStorage.setItem("todos", JSON.stringify(newTodos));
		console.log("check!");
		setTodos(newTodos);
	};

	const deleteTodo = (id: string) => {
		const newTodos = todos.filter((todo) => todo.id !== id);
		localStorage.setItem("todos", JSON.stringify(newTodos));
		setTodos(newTodos);
	};

	/**
	 * init
	 */
	useEffect(() => {
		const lsTodo = localStorage.getItem("todos");
		lsTodo && setTodos(JSON.parse(lsTodo));
		console.log("init");
	}, []);

	return ReactDOM.createElement(
		"div",
		{ id: "todo-app", key: "todo-app" },
		[
			ReactDOM.createElement("h3", {}, ["Todo App"]),

			ReactDOM.createElement("div", {}, [
				ReactDOM.createElement(
					"input",
					{
						value: title,
						onInput: (e: { target: { value: string } }) => {
							setTitle(e.target.value);
						},
						style: "margin-right: 15px;",
					},
					[]
				),
				ReactDOM.createElement(
					"button",
					{
						onClick: () => {
							addTodo();
						},
						style: styles.addTodoButton,
					},
					["Add"]
				),
			]),

			ReactDOM.createElement(
				"ul",
				{},
				todos.map((todo) =>
					ReactDOM.createElement("div", { key: `${todo.id}` }, [
						TodoItem({
							todo,
							onCheck: () => {
								toggleTodoStatus(todo.id);
							},
							onClickDelete: () => {
								deleteTodo(todo.id);
							},
						}),
					])
				)
			),
		]
	);
};

const styles = ReactStyleSheet.create({
	addTodoButton: {
		padding: ".5rem",
		border: "none",
		background: THEME.secondary,
		color: "#fff",
		"font-weight": "bold",
		"border-radius": ".25rem",
	},
});
export default TodoApp;
