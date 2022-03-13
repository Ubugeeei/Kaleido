import { h } from "../../src/createElement";
import { Todo } from "../App";

const TodoList = (props: { todos: Todo[] }) => {
	return h(
		"ul",
		{},
		props.todos.map((it) =>
			h(
				"li",
				{
					class: "todo-item",
				},
				[it.title]
			)
		)
	);
};

export default TodoList;
