import { h } from "../src/createElement";

export interface Todo {
	title: string;
}

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
