import { ElementAttachedNeedAttr } from "~/src/core/dom/interface";
import { render } from "~/src/core/dom/render";
import { FC } from "../dom";

export interface State {
  value: unknown;
  initialized: boolean;
}
export interface MemorizedStates {
  value: unknown;
  deps: unknown[];
}

export interface MemorizedCallbackFunction {
  value: Function;
  deps: unknown[];
}

export type MutableRefObject<T> = {
  current: T;
}

interface Effect {
  exec: Function;
}

interface DepsEffect extends Effect {
  deps: unknown[];
  isNeedEffect?: boolean;
}

class InternalRouteState {
  vNodeRender!: FC<{}>;
  realNode?: ElementAttachedNeedAttr | null;

  /** for useState */
  states: State[] = [];
  currentSetStateIndex = 0;

  /** for useMemo */
  memorizedStates: MemorizedStates[] = [];
  currentSetMemorizedStateIndex = 0;

  /** for useCallback */
  callbacks: MemorizedCallbackFunction[] = [];
  currentSetCallbackIndex = 0;

  /** for useEffect */
  effectsOnRendered: Effect[] = [];
  effectsOnRenderedWithDeps: DepsEffect[] = [];
  effectsOnMounted: Effect[] = [];
  effectsOnUnMounted: Function[] = [];
  currentSetEffectIndex = 0;

  /** for useRef */
  mutableRefs: MutableRefObject<unknown>[] = [];
  currentSetMutableRefIndex = 0;

  /** context */
  contextStates: unknown[] = []
  currentSetContextStateIndex = 0;

  mount(
    vNodeRender: FC<{}>,
    realNode?: ElementAttachedNeedAttr | null
  ) {
    if (!realNode) throw new Error("Error! realNode is null");
    if (!realNode.parentElement)
      throw new Error("Error! realNode does not have parentNode.");

    this.vNodeRender = vNodeRender;
    this.realNode = realNode;
    this.vNodeRender();

    this.effectInitialRender();
  }

  unMount() {
    this.realNode = null;

    this.effectsOnUnMounted.forEach((it) => {
      it();
    });
  }

  render() {
    const _this = this;
    if (!_this.realNode) return;
    this.currentSetStateIndex = 0;
    this.currentSetEffectIndex = 0;
    this.currentSetMemorizedStateIndex = 0;

    _this.effectsOnRendered = [];
    render(_this.vNodeRender(), _this.realNode);

    _this.effectsOnRenderedWithDeps.forEach((it) => {
      if (!it.isNeedEffect) return;
      it.exec();
      it.isNeedEffect = false;
    });

    _this.effectsOnUnMounted = [];
    _this.effectsOnRendered.forEach((it) => {
      const unMountFunc = it.exec();
      unMountFunc && _this.effectsOnUnMounted.push(unMountFunc);
    });
  }

  effectInitialRender() {
    this.effectsOnMounted.forEach((it) => {
      it.exec();
    });
  }

  cleanUp() {
    this.states = [];
    this.currentSetStateIndex = 0;

    this.memorizedStates = [];
    this.currentSetCallbackIndex = 0;

    this.callbacks = [];
    this.currentSetMemorizedStateIndex = 0;

    this.effectsOnRendered = [];
    this.effectsOnRenderedWithDeps = [];
    this.effectsOnMounted = [];
    this.effectsOnUnMounted = [];
    this.currentSetEffectIndex = 0;

    this.mutableRefs = [];
    this.currentSetMutableRefIndex = 0;

    this.contextStates = [];
    this.currentSetContextStateIndex = 0;
  }
}


export const rootComponentInstance = new InternalRouteState();
