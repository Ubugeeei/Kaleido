import { MemorizedStates } from "../components/index";
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
			// あれば依存値の新旧を比較し、差異があればisNeedEffectをtrueにしdepsを更新
			currentEffect.deps.forEach((dep, i) => {
				if (dep !== deps[i]) {
					currentEffect.deps = deps;
					currentEffect.isNeedEffect = true;
				}
			});
		}
	} else {
		rootComponentInstance.mountingEffects.push({
			exec,
		});
	}
	rootComponentInstance.currentSetEffectIndex++;
};

export const useMemo = <T>(getter: () => T, deps: any[]): T => {
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
	for (const i in deps) {
		const _i = Number(i);
		if (isNaN(_i)) continue;
		if (deps[_i] !== memo.deps[_i]) {
			memo.deps = deps;
			return getter();
		}
	}

	rootComponentInstance.currentSetMemoIndex++;

	// use memo
	return memo.value;
};
