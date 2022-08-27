import KaleidoDOM, { FC } from "~/src/core/dom";
import KaleidoRouter, { useRouter } from "~/src/core/router";
import { KaleidoStyleSheet } from "~/src/core/style";

import Home from "./pages";
import Counter from "./pages/counter";
import Todo from "./pages/todo";
import RefSample from "./pages/ref";

import { THEME, utilStyles } from "./style/util";

const App: FC<{}> = () => {
	const router = useRouter();

	return KaleidoDOM.createElement(
		"div",
		{ style: styles.appContainer },
		[
			KaleidoDOM.createElement(
				"nav",
				{ style: utilStyles.flex + styles.nav },
				[
					KaleidoDOM.createElement(
						"div",
						{
							onClick: () => router.push("/"),
							style: utilStyles.mr3,
						},
						["home"]
					),
					KaleidoDOM.createElement(
						"div",
						{
							onClick: () => router.push("/counter"),
							style: utilStyles.mr3,
						},
						["counter"]
					),
					KaleidoDOM.createElement(
						"div",
						{
							onClick: () => router.push("/todo"),
							style: utilStyles.mr3,
						},
						["todo"]
					),
					KaleidoDOM.createElement(
						"div",
						{
							onClick: () => router.push("/ref-sample"),
							style: utilStyles.mr3,
						},
						["ref sample"]
					),
				]
			),

			KaleidoRouter.Router({ style: utilStyles.pa4 }, [
				KaleidoRouter.Route({ path: "/", component: Home }),
				KaleidoRouter.Route({ path: "/counter", component: Counter }),
				KaleidoRouter.Route({ path: "/todo", component: Todo }),
				KaleidoRouter.Route({ path: "/ref-sample", component: RefSample }),
			]),
		]
	);
};

const styles = KaleidoStyleSheet.create({
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

KaleidoDOM.render(App, document.getElementById("root-element"));
