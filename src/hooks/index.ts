import { render } from "../react-dom/render";
import { rootComponentInstance } from "../react-root/index";

export const useState = <T>(
	initialValue: T,
	stateKey: string
): [T, (arg: T) => void] => {
	if (!rootComponentInstance.state[stateKey]) {
		rootComponentInstance.state[stateKey] = {
			value: initialValue,
			initialized: true,
		};
	}

	if (!rootComponentInstance.state[stateKey].initialized) {
		rootComponentInstance.state[stateKey].value = initialValue;
		rootComponentInstance.state[stateKey].initialized = true;
	}

	const setState = (newVal: T): void => {
		rootComponentInstance.state[stateKey].value = newVal;
		rootComponentInstance.render();
	};

	return [rootComponentInstance.state[stateKey].value as T, setState];
};

export const useEffect = (exec: Function, deps?: any[]) => {
	if (!deps) {
		rootComponentInstance.renderingEffects.push({
			exec,
		});
	} else if (deps.length) {
		rootComponentInstance.depsRenderingEffects.push({
			exec,
			deps,
		});
	} else {
		rootComponentInstance.mountingEffects.push({
			exec,
		});
	}
};
