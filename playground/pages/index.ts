import ReactDOM from "../../src/react-dom/index";

const Home = () =>
	ReactDOM.createElement("div", { key: "home" }, [
		ReactDOM.createElement("h3", {}, ["Hello React Scratch!"]),
	]);

export default Home;
