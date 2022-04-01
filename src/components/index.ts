import {
	ElementAttachedNeedAttr,
	VirtualNodeType,
} from "../react-dom/interface";
import { render } from "../react-dom/render";

export interface Effect {
	exec: Function;
	deps?: any[];
}

export class Component {
	vNodeRender!: () => VirtualNodeType;
	realNode?: ElementAttachedNeedAttr | null;
	state: { [key: string | symbol]: any };
	renderingEffects: Effect[];
	depsRenderingEffects: Effect[];
	mountingEffects: Effect[];
	unMountingEffects: Function[];
	constructor() {
		this.state = {};
		this.renderingEffects = [];
		this.depsRenderingEffects = [];
		this.mountingEffects = [];
		this.unMountingEffects = [];
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

		// レンダリングするということはunMountされる
		this.unMountingEffects.forEach((it) => {
			it();
		});
	}

	render() {
		const _this = this;
		if (!_this.realNode) return;

		_this.renderingEffects = [];
		render(_this.vNodeRender(), _this.realNode);
		// レンダリングするときにuseEffectで登録された関数を実行
		_this.unMountingEffects = [];
		_this.renderingEffects.forEach((it) => {
			const unMountFunc = it.exec();
			unMountFunc && _this.unMountingEffects.push(unMountFunc);
		});

		// newTmpを使ってDOM操作(差分検知、仮想DOM更新、実際のDOMを更新して完了)
		// do something
	}
}

export default { Component };
