import KaleidoDOM from "~/src/core/dom";
import { KaleidoStyleSheet } from "~/src/core/style";

import { utilStyles } from "~/playground/style/util";
import { Todo } from "~/playground/pages/todo";
import { FC } from "~/src/core/dom";

interface Props {
	todo: Todo;
	onCheck: (id: string) => void;
	onClickDelete: (id: string) => void;
}

const TodoItem: FC<Props> = (props) => {
	const { todo, onCheck, onClickDelete } = props!;

	return KaleidoDOM.createElement(
		"li",
		{
			style:
				"list-style: none;" +
				utilStyles.flex +
				(todo.completed ? utilStyles.op05 : utilStyles.op1) +
				(todo.completed ? utilStyles.lineThrough : ""),
		},
		[
			KaleidoDOM.createElement(
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
			KaleidoDOM.createElement("span", {}, [todo.title]),
			KaleidoDOM.createElement(
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

const styles = KaleidoStyleSheet.create({
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
