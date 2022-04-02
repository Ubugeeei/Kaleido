import ReactDOM from "../src/react-dom/index";
import ReactRouter, { useRouter } from "../src/router/index";
import { ReactStyleSheet } from "../src/style/index";
import { useEffect } from "../src/hooks/index";

import Home from "./pages/index";
import Counter from "./pages/counter";
import Todo from "./pages/todo";
import { THEME, utilStyles } from "./style/util";

const App = () => {
	const router = useRouter();

	useEffect(() => {
		console.log("App mounted");
	}, []);

	return ReactDOM.createElement(
		"div",
		{ style: styles.appContainer },
		[
			ReactDOM.createElement(
				"nav",
				{ style: utilStyles.flex + styles.nav },
				[
					ReactDOM.createElement(
						"div",
						{
							onClick: () => router.push("/"),
							style: utilStyles.mr3,
						},
						["home"]
					),
					ReactDOM.createElement(
						"div",
						{
							onClick: () => router.push("/counter"),
							style: utilStyles.mr3,
						},
						["counter"]
					),
					ReactDOM.createElement(
						"div",
						{
							onClick: () => router.push("/todo"),
							style: utilStyles.mr3,
						},
						["todo"]
					),
				]
			),

			ReactRouter.Router({ style: utilStyles.pa4 }, [
				ReactRouter.Route({ path: "/", component: Home }),
				ReactRouter.Route({ path: "/counter", component: Counter }),
				ReactRouter.Route({ path: "/todo", component: Todo }),
			]),
		]
	);
};

const styles = ReactStyleSheet.create({
	appContainer: {
		height: "100%",
		"min-height": "600px",
		background: "#fafafa",
		color: "#444444",
		border: "2px solid #ccc",
		"border-radius": ".5rem",
	},
	nav: {
		display: "flex",
		padding: "1rem",
		background: THEME.primary,
		color: "#fff",
		"font-size": "1.2rem",
		"text-decoration": "underline",
		cursor: "pointer",
	},
});

ReactDOM.render(App, document.getElementById("root-element"));
