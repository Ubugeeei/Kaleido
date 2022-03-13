import {
	VirtualNodeType,
	ElementAttachedNeedAttr,
	TextAttachedVDom,
} from "../vNode.interface";
import { TEXT_NODE } from "./createElement";
import { patchProperty } from "./patch";

export const createRealNodeFromVNode = (
	VNode: VirtualNodeType
): ElementAttachedNeedAttr | TextAttachedVDom | null => {
	if (typeof VNode.name !== "string") return null;

	let realNode: ElementAttachedNeedAttr | TextAttachedVDom;
	if (VNode.nodeType === TEXT_NODE) {
		realNode = document.createTextNode(VNode.name);
		VNode.realNode = realNode;
		realNode.vdom = VNode;
	} else {
		realNode = document.createElement(VNode.name);
		for (const propName in VNode.props) {
			patchProperty(realNode, propName, null, VNode.props[propName]);
		}

		VNode.realNode = realNode;
		realNode.vdom = VNode;

		for (const child of VNode.children) {
			const realChildNode = createRealNodeFromVNode(child);
			if (realChildNode !== null) realNode.append(realChildNode);
		}
	}

	return realNode;
};
