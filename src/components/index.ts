import {
	ElementAttachedNeedAttr,
	VirtualNodeType,
} from "../react-dom/interface";
import { render } from "../react-dom/render";

interface Effect {
	exec: Function;
	deps?: any[];
}

export class Component {
	vNodeRender!: () => VirtualNodeType;
	realNode?: ElementAttachedNeedAttr | null;
	states: any[];
	renderingEffects: Effect[];
	depsRenderingEffects: Effect[];
	mountingEffects: Effect[];
	unMountingEffects: Function[];
	currentSetStateIndex: number;
	constructor() {
		this.states = [];
		this.renderingEffects = [];
		this.depsRenderingEffects = [];
		this.mountingEffects = [];
		this.unMountingEffects = [];
		this.currentSetStateIndex = 0;
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

		this.mountingEffects.forEach((it) => {
			it.exec();
		});
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

		_this.renderingEffects = [];
		render(_this.vNodeRender(), _this.realNode);

		// レンダリングするときにuseEffectで登録された関数を実行
		_this.unMountingEffects = [];
		_this.renderingEffects.forEach((it) => {
			const unMountFunc = it.exec();
			unMountFunc && _this.unMountingEffects.push(unMountFunc);
		});
	}
}

export default { Component };
