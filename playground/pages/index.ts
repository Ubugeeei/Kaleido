import KaleidoDOM from "~/src/core/dom";
import { FC } from "~/src/core/dom";

const Home: FC<{}> = () =>
	KaleidoDOM.createElement(
		"div",
		{ id: "pages-home", key: "pages-home" },
		[KaleidoDOM.createElement("h3", {}, ["Hello Kaleido!"])]
	);

export default Home;
