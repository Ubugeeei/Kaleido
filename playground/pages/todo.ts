import KaleidoDOM, { FC } from "~/src/core/dom";
import { useEffect, useState } from "~/src/core/hooks";
import { KaleidoStyleSheet } from "~/src/core/style";
import { getUniqueKey } from "~/src/helper";

import { THEME, utilStyles } from "~/playground/style/util";
import TodoItem from "~/playground/components/todo/TodoItem";

export interface Todo {
	id: string;
	title: string;
	completed: boolean;
}

const TodoApp: FC<{}> = () => {
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
	}, []);

	return KaleidoDOM.createElement(
		"div",
		{ id: "pages-todo", key: "pages-todo" },
		[
			KaleidoDOM.createElement("h3", {}, ["Todo App"]),

			KaleidoDOM.createElement("div", {}, [
				KaleidoDOM.createElement(
					"input",
					{
						value: title,
						type: "text",
						onInput: (e: { target: { value: string } }) => {
							setTitle(e.target.value);
						},
						style: "margin-right: 15px;",
					},
					[]
				),
				KaleidoDOM.createElement(
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

			KaleidoDOM.createElement(
				"ul",
				{ style: utilStyles.pl0 },
				todos.map((todo) =>
					KaleidoDOM.createElement("div", { key: `${todo.id}` }, [
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

const styles = KaleidoStyleSheet.create({
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
