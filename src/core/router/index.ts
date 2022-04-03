import { VirtualNodeType } from "~/src/core/dom/interface";
import ReactDOM from "~/src/core/dom";
import { rootComponentInstance } from "~/src/core/root";

interface RouteOption {
	path: string;
	component: () => VirtualNodeType;
}

type RouterOption = string | { path: string };

export const Router = (
	props: { [key: string]: any },
	routes: RouteOption[]
) => {
	const route = routes.find((it) => it.path === location.pathname);

	return ReactDOM.createElement("div", props, [
		route ? route.component() : "",
	]);
};

export const Route = (option: RouteOption): RouteOption => option;

export const useRouter = () => ({
	push: (option: RouterOption) => {
		if (typeof option === "string") {
			if (option === location.pathname) return;
			history.pushState(null, ",", option);
		} else {
			if (option.path === location.pathname) return;
			// TODO: hash, query pram
			history.pushState(null, ",", option.path);
		}
		rootComponentInstance.cleanUp();
		rootComponentInstance.render();
		rootComponentInstance.effectInitialRender();
	},

	replace: (option: RouterOption) => {
		if (typeof option === "string") {
			history.replaceState(null, ",", option);
		} else {
			history.replaceState(null, ",", option.path);
		}
		rootComponentInstance.cleanUp();
		rootComponentInstance.render();
		rootComponentInstance.effectInitialRender();
	},

	go: (n: number) => {
		history.go(n);
		rootComponentInstance.cleanUp();
		rootComponentInstance.render();
		rootComponentInstance.effectInitialRender();
	},

	back: () => {
		history.back();
		rootComponentInstance.cleanUp();
		rootComponentInstance.render();
	},
});

export default {
	useRouter,
	Router,
	Route,
};
