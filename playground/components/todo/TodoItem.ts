import ReactDOM from "../../../src/react-dom/index";
import { ReactStyleSheet } from "../../../src/style/index";
import { THEME, utilStyles } from "../../style/util";
import { Todo } from "../../pages/Todo";

const TodoItem = (props: {
	todo: Todo;
	onCheck: (id: number) => void;
	onClickDelete: (id: number) => void;
}) => {
	const { todo, onCheck, onClickDelete } = props;

	return ReactDOM.createElement(
		"li",
		{
			style:
				"list-style: none;" +
				utilStyles.flex +
				(todo.completed ? utilStyles.op025 : utilStyles.op1) +
				(todo.completed ? utilStyles.lineThrough : ""),
		},
		[
			ReactDOM.createElement(
				"input",
				{
					type: "checkbox",
					value: todo.completed,
					onInput: () => {
						onCheck(todo.id);
					},
					style: todo.completed
						? styles.checkedInput
						: styles.uncheckedInput,
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

const styles = ReactStyleSheet.create({
	checkedInput: {
		height: "20px",
		width: "20px",
	},
	uncheckedInput: {
		height: "20px",
		width: "20px",
	},
});

export default TodoItem;
