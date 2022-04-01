import { render } from "../react-dom/render";
import { rootComponentInstance } from "../react-root/index";

export const useState = <T>(
	initialValue: T
): [T, (arg: T) => void] => {
	const i = rootComponentInstance.currentSetStateIndex;
	if (!rootComponentInstance.states[i]) {
		rootComponentInstance.states.push({
			value: initialValue,
			initialized: true,
		});
	}

	if (!rootComponentInstance.states[i].initialized) {
		rootComponentInstance.states[i].value = initialValue;
		rootComponentInstance.states[i].initialized = true;
	}

	const setState = (newVal: T): void => {
		rootComponentInstance.states[i].value = newVal;
		rootComponentInstance.render();
	};

	rootComponentInstance.currentSetStateIndex++;

	return [rootComponentInstance.states[i].value as T, setState];
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
