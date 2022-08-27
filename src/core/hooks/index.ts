import { MemorizedStates, MutableRefObject, rootComponentInstance } from "~/src/core/root";
import { shallowEqualArray } from "~/src/helper";

type SetStateAction<S> = S | ((prevState: S) => S);

export const useState = <T>(
	initialValue: T
): [T, (setStateAction: SetStateAction<T>) => void] => {
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

	const setState = (setStateAction: SetStateAction<T>): void => {
		if (typeof setStateAction === "function") {
			setStateAction = setStateAction as ((current: T) => T) // type guard
			rootComponentInstance.states[i].value = setStateAction(rootComponentInstance.states[i].value as T);
		} else {
			rootComponentInstance.states[i].value = setStateAction;
		}

		rootComponentInstance.render();
	};

	rootComponentInstance.currentSetStateIndex++;

	return [rootComponentInstance.states[i].value as T, setState];
};

export const useEffect = (exec: Function, deps?: unknown[]) => {
	if (!deps) {
		rootComponentInstance.effectsOnRendered.push({
			exec,
		});
	} else if (deps.length) {
		const currentEffect =
			rootComponentInstance.effectsOnRenderedWithDeps[
			rootComponentInstance.currentSetEffectIndex
			];

		if (!currentEffect) {
			// なければ登録 (初回登録)
			rootComponentInstance.effectsOnRenderedWithDeps[
				rootComponentInstance.currentSetEffectIndex
			] = {
				exec,
				deps,
				isNeedEffect: true,
			};
		} else {
			// update
			if (!shallowEqualArray(currentEffect.deps, deps)) {
				currentEffect.deps = deps;
				currentEffect.isNeedEffect = true;
			}
		}
	} else {
		rootComponentInstance.effectsOnMounted.push({
			exec,
		});
	}
	rootComponentInstance.currentSetEffectIndex++;
};

export const useMemo = <T>(getter: () => T, deps: unknown[]): T => {
	const i = rootComponentInstance.currentSetMemorizedStateIndex;

	const memo: MemorizedStates | undefined =
		rootComponentInstance.memorizedStates[i];

	// initial
	if (!memo) {
		const value = getter();
		rootComponentInstance.memorizedStates[i] = {
			value,
			deps,
		};
		return value;
	}

	// updated
	if (!shallowEqualArray(deps, memo.deps)) {
		memo.deps = deps;
		const newValue = getter();
		memo.value = newValue;
		return newValue;
	}

	rootComponentInstance.currentSetMemorizedStateIndex++;

	// use memo
	return memo.value as T;
};

export const useCallback = (cb: Function, deps: unknown[]) => {
	const i = rootComponentInstance.currentSetCallbackIndex;
	const callback = rootComponentInstance.callbacks[i];

	if (!callback) {
		// initial
		rootComponentInstance.callbacks[i] = {
			value: cb,
			deps,
		};
	} else {
		// updated
		if (!shallowEqualArray(deps, callback.deps)) {
			callback.deps = deps;
			callback.value = cb;
		}
	}

	rootComponentInstance.currentSetCallbackIndex++;
	return callback.value;
}

export const useRef = <T>(initialValue: T): MutableRefObject<T> => {
	const i = rootComponentInstance.currentSetMutableRefIndex;

	if (rootComponentInstance.mutableRefs[i] === undefined) {
		rootComponentInstance.mutableRefs[i] = {
			current: initialValue,
		};
	}

	rootComponentInstance.currentSetMutableRefIndex++;

	return rootComponentInstance.mutableRefs[i] as MutableRefObject<T>;
}