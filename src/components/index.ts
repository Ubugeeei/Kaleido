import {
	ElementAttachedNeedAttr,
	VirtualNodeType,
} from "../react-dom/interface";
import { render } from "../react-dom/render";

interface Effect {
	exec: Function;
}

interface DepsEffect extends Effect {
	deps: any[];
	isNeedEffect?: boolean;
}

export interface MemorizedStates {
	value: any;
	deps: any[];
}

export class Component {
	vNodeRender!: () => VirtualNodeType;
	realNode?: ElementAttachedNeedAttr | null;
	states: any[];
	memorizedStates: MemorizedStates[];
	renderingEffects: Effect[];
	depsRenderingEffects: DepsEffect[];
	mountingEffects: Effect[];
	unMountingEffects: Function[];
	currentSetStateIndex: number;
	currentSetEffectIndex: number;
	currentSetMemoIndex: number;

	constructor() {
		this.states = [];
		this.memorizedStates = [];
		this.renderingEffects = [];
		this.depsRenderingEffects = [];
		this.mountingEffects = [];
		this.unMountingEffects = [];
		this.currentSetStateIndex = 0;
		this.currentSetEffectIndex = 0;
		this.currentSetMemoIndex = 0;
	}

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
		this.memorizedStates = [];
		this.renderingEffects = [];
		this.depsRenderingEffects = [];
		this.mountingEffects = [];
		this.unMountingEffects = [];
		this.currentSetStateIndex = 0;
		this.currentSetEffectIndex = 0;
		this.currentSetMemoIndex = 0;
	}
}

export default { Component };
