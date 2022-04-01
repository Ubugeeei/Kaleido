import ReactDOM from "../../../src/react-dom/index";
import { Todo } from "./TodoApp";

const TodoItem = (props: {
	todo: Todo;
	onCheck: (id: number) => void;
	onClickDelete: (id: number) => void;
}) => {
	const { todo, onCheck, onClickDelete } = props;

	return ReactDOM.createElement(
		"li",
		{ style: "list-style: none;" },
		[
			ReactDOM.createElement(
				"input",
				{
					type: "checkbox",
					value: todo.completed,
					onInput: () => {
						onCheck(todo.id);
					},
				},
				[]
			),
			ReactDOM.createElement("span", {}, [todo.title]),
			ReactDOM.createElement(
				"button",
				{
					onClick: () => {
						onClickDelete(todo.id);
					},
					style:
						"margin-left: 15px; background-color: #fff; border: none;",
				},
				["✕"]
			),
		]
	);
};

export default TodoItem;
