import ReactDOM from "../../src/react-dom";

const MyComponent = (props: { myProps: string[] }) => {
	return ReactDOM.createElement(
		"ul",
		{},
		props.myProps.map((it) =>
			ReactDOM.createElement(
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
