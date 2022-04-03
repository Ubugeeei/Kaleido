import ReactDOM from "../../src/react-dom/index";

const Home = () =>
	ReactDOM.createElement("div", { id: "pages-home", key: "pages-home" }, [
		ReactDOM.createElement("h3", {}, ["Hello React Scratch!"]),
	]);

export default Home;
