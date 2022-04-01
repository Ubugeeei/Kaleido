import { useState } from "../../../src/hooks/index";
import ReactDOM from "../../../src/react-dom/index";
import TodoItem from "./TodoItem";

export interface Todo {
	id: number;
	title: string;
	completed: boolean;
}

const TodoApp = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [title, setTitle] = useState("");
	const [todoId, setTodoId] = useState(0);

	const addTodo = () => {
		setTodoId(todoId + 1);
		setTodos([
			...todos,
			{
				id: todoId,
				title,
				completed: false,
			},
		]);

		setTitle("");
	};

	const toggleTodoStatus = (id: number) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id
					? {
							...todo,
							completed: !todo.completed,
					  }
					: todo
			)
		);
		console.log("check!");
	};

	const deleteTodo = (id: number) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	return ReactDOM.createElement("div", { id: "todo-app" }, [
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
				},
				["Add"]
			),
		]),

		ReactDOM.createElement(
			"ul",
			{},
			todos.map((todo) =>
				TodoItem({
					todo,
					onCheck: () => {
						toggleTodoStatus(todo.id);
					},
					onClickDelete: () => {
						deleteTodo(todo.id);
					},
				})
			)
		),
	]);
};

export default TodoApp;
