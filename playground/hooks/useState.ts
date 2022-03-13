import { render } from "../../src/render";
import App from "../App";
const RootState: { [key: string | symbol]: any } = {
	// inputVal: { value: "", initialized: false },
	// todos: { value: [], initialized: false },
};

export const useState = <T>(
	initialValue: T,
	stateKey: string
): [T, (arg: T) => void] => {
	if (!RootState[stateKey]) {
		RootState[stateKey] = { value: initialValue, initialized: true };
	}

	if (!RootState[stateKey].initialized) {
		RootState[stateKey].value = initialValue;
		RootState[stateKey].initialized = true;
	}

	const setState = (newVal: T): void => {
		RootState[stateKey].value = newVal;
		render(App(), document.getElementById("root-element"));
	};

	return [RootState[stateKey].value as T, setState];
};
