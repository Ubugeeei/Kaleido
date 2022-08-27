import {
  ElementAttachedNeedAttr,
  VirtualNodeType,
} from "~/src/core/dom/interface";
import { render } from "~/src/core/dom/render";

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
  vNodeRender!: () => VirtualNodeType;
  realNode?: ElementAttachedNeedAttr | null;

  /** for useState */
  states: State[] = [];
  currentSetStateIndex = 0;

  /** for useMemo */
  memorizedStates: MemorizedStates[] = [];
  currentSetMemoIndex = 0;

  /** for useCallback */
  callbacks: MemorizedCallbackFunction[] = [];
  currentSetCallbackIndex = 0;

  /** for useEffect */
  renderingEffects: Effect[] = [];
  depsRenderingEffects: DepsEffect[] = [];
  mountingEffects: Effect[] = [];
  unMountingEffects: Function[] = [];
  currentSetEffectIndex = 0;

  /** for useRef */
  mutableRefs: MutableRefObject<unknown>[] = [];
  currentSetRefIndex = 0;

  mount(
    vNodeRender: () => VirtualNodeType,
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

    this.unMountingEffects.forEach((it) => {
      it();
    });
  }

  render() {
    const _this = this;
    if (!_this.realNode) return;
    this.currentSetStateIndex = 0;
    this.currentSetEffectIndex = 0;
    this.currentSetMemoIndex = 0;

    _this.renderingEffects = [];
    render(_this.vNodeRender(), _this.realNode);

    _this.depsRenderingEffects.forEach((it) => {
      if (!it.isNeedEffect) return;
      it.exec();
      it.isNeedEffect = false;
    });

    // レンダリングするときにuseEffectで登録された関数を実行
    _this.unMountingEffects = [];
    _this.renderingEffects.forEach((it) => {
      const unMountFunc = it.exec();
      unMountFunc && _this.unMountingEffects.push(unMountFunc);
    });
  }

  effectInitialRender() {
    this.mountingEffects.forEach((it) => {
      it.exec();
    });
  }

  cleanUp() {
    this.states = [];
    this.currentSetStateIndex = 0;

    this.memorizedStates = [];
    this.currentSetMemoIndex = 0;

    this.callbacks = [];
    this.currentSetCallbackIndex = 0;

    this.renderingEffects = [];
    this.depsRenderingEffects = [];
    this.mountingEffects = [];
    this.unMountingEffects = [];
    this.currentSetEffectIndex = 0;

    this.mutableRefs = [];
    this.currentSetRefIndex = 0;
  }
}


export const rootComponentInstance = new InternalRouteState();
