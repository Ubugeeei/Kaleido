import ReactDOM from "~/src/core/dom";
import { ReactStyleSheet } from "~/src/core/style";

import { utilStyles } from "~/playground/style/util";
import { Todo } from "~/playground/pages/Todo";

const TodoItem = (props: {
	todo: Todo;
	onCheck: (id: string) => void;
	onClickDelete: (id: string) => void;
}) => {
	const { todo, onCheck, onClickDelete } = props;

	return ReactDOM.createElement(
		"li",
		{
			style:
				"list-style: none;" +
				utilStyles.flex +
				(todo.completed ? utilStyles.op05 : utilStyles.op1) +
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
