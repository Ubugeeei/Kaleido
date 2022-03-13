import { TEXT_NODE } from "../createElement";
import { VirtualNodeType } from "../vNode.interface";

export const renderNode = (
	parentNode: HTMLElement,
	realNode: VirtualNodeType["realNode"],
	oldVNode: VirtualNodeType | null,
	newVNode: VirtualNodeType
) => {
	if (newVNode === oldVNode) return;

	if (
		oldVNode &&
		newVNode.nodeType === TEXT_NODE &&
		oldVNode.nodeType === TEXT_NODE
	) {
		realNode = renderTextNode(realNode, newVNode);
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

	if (typeof newVNode.name === "string") {
		realNode.nodeValue = newVNode.name;
		return realNode;
	} else {
		console.error(
			"Error!rendering nodeType is TEXT_NODE, but newNode.name is not string."
		);
		return realNode;
	}
};
