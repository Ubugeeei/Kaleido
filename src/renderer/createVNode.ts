import {
	TEXT_NODE,
	createTextVNode,
	createVNode,
} from "./createElement";
import { VirtualNodeType } from "../vNode.interface";

export const createVNodeFromRealElement = (
	realElement: HTMLElement
): VirtualNodeType => {
	// prettier-ignore
	if (realElement.nodeType === TEXT_NODE) return createTextVNode(realElement.nodeName, realElement);

	const VNodeChildren: VirtualNodeType[] = [];
	for (const i in realElement.childNodes) {
		const child = realElement.children.item(Number(i));
		if (child === null) continue;
		const childVNode = createVNodeFromRealElement(
			child as HTMLElement
		);
		VNodeChildren.push(childVNode);
	}

	const props: VirtualNodeType["props"] = {};
	if (realElement.hasAttributes()) {
		for (const i in realElement.attributes) {
			const { name, value } = realElement.attributes[Number(i)];
			props[name] = value;
		}
	}

	const VNode = createVNode(
		realElement.nodeName.toLowerCase(),
		props,
		VNodeChildren,
		realElement,
		null
	);

	return VNode;
};
