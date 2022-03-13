import { createVNodeFromRealElement } from "./createVNode";
import {
	ElementAttachedNeedAttr,
	VirtualNodeType,
} from "../vNode.interface";
import { renderNode } from "./renderNode";

export const render = (
	realNode: ElementAttachedNeedAttr,
	newVNode: VirtualNodeType
) => {
	if (!realNode.parentElement) {
		throw new Error("Error! realNode does not have parentNode.");
	}

	const vNode = createVNodeFromRealElement(realNode);
	vNode.children = [newVNode];
	newVNode = vNode;

	const oldVNode = realNode.vdom ? realNode.vdom : { ...vNode };

	renderNode(realNode.parentElement, realNode, oldVNode, newVNode);
};
