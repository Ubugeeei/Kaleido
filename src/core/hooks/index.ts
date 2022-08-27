import { MemorizedStates } from "~/src/core/components";
import { rootComponentInstance } from "~/src/core/root";
import { shallowEqualArray } from "~/src/helper";

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

export const useEffect = (exec: Function, deps?: unknown[]) => {
	if (!deps) {
		rootComponentInstance.renderingEffects.push({
			exec,
		});
	} else if (deps.length) {
		const currentEffect =
			rootComponentInstance.depsRenderingEffects[
			rootComponentInstance.currentSetEffectIndex
			];

		if (!currentEffect) {
			// なければ登録 (初回登録)
			rootComponentInstance.depsRenderingEffects[
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
		rootComponentInstance.mountingEffects.push({
			exec,
		});
	}
	rootComponentInstance.currentSetEffectIndex++;
};

export const useMemo = <T>(getter: () => T, deps: unknown[]): T => {
	const i = rootComponentInstance.currentSetMemoIndex;

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

	rootComponentInstance.currentSetMemoIndex++;

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