import { TEXT_NODE } from "./createElement";
import { VirtualNodeType } from "../vNode.interface";
import { createRealNodeFromVNode } from "./createRealNode";

export const renderNode = (
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
	else if (oldVNode === null || oldVNode.name !== newVNode.name) {
		const newRealNode = createRealNodeFromVNode(newVNode);
		if (newRealNode !== null) {
			parentNode.insertBefore(newRealNode, realNode);
		}

		if (oldVNode !== null && oldVNode.realNode !== null) {
			parentNode.removeChild(oldVNode.realNode);
		}
		//  ...
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
