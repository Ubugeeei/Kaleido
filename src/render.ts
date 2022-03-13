import { TEXT_NODE } from "./createElement";
import { createRealNodeFromVNode } from "./createRealNode";
import { createVNodeFromRealElement } from "./createVNode";
import {
	ElementAttachedNeedAttr,
	VirtualNodeType,
} from "./vNode.interface";

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

const renderNode = (
	parentNode: HTMLElement,
	realNode: VirtualNodeType["realNode"],
	oldVNode: VirtualNodeType | null,
	newVNode: VirtualNodeType
) => {
	// do none
	if (newVNode === oldVNode) return;

	// render text
	if (
		oldVNode &&
		newVNode.nodeType === TEXT_NODE &&
		oldVNode.nodeType === TEXT_NODE
	) {
		realNode = renderTextNode(realNode, newVNode);
	}

	// render element
	else if (!oldVNode || oldVNode.name !== newVNode.name) {
		const newRealNode = createRealNodeFromVNode(newVNode);

		// prettier-ignore
		if (newRealNode)
			parentNode.insertBefore(newRealNode, realNode);

		if (oldVNode && oldVNode.realNode)
			parentNode.removeChild(oldVNode.realNode);
	}
};

const renderTextNode = (
	realNode: VirtualNodeType["realNode"],
	newVNode: VirtualNodeType
) => {
	if (!realNode) {
		console.error(
			"Error! rendering nodeType is TEXT_NODE, but realNode is null."
		);
		return realNode;
	}
	if (typeof newVNode.name !== "string") {
		console.error(
			"Error! rendering nodeType is TEXT_NODE, but newNode.name is not string."
		);
		return realNode;
	}

	realNode.nodeValue = newVNode.name;

	return realNode;
};
