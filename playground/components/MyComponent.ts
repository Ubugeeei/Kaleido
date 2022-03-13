import { h } from "../../src/createElement";

const MyComponent = (props: { myProps: string[] }) => {
	return h(
		"ul",
		{},
		props.myProps.map((it) =>
			h(
				"li",
				{
					class: "todo-item",
				},
				[it]
			)
		)
	);
};

export default MyComponent;
