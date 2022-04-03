import { KeyAttribute, VirtualNodeType } from "./interface";

export const TEXT_NODE = 3;

/**
 * create element function h
 */
export const createElement = (
	name: VirtualNodeType["name"],
	props: VirtualNodeType["props"],
	children: (VirtualNodeType | string)[],
	realNode?: VirtualNodeType["realNode"]
): VirtualNodeType => {
	const VNodeChildren: VirtualNodeType[] = [];
	children.forEach((it) => {
		if (typeof it === "string") {
			const textVNode = createTextVNode(it);
			VNodeChildren.push(textVNode);
		} else {
			VNodeChildren.push(it);
		}
	});

	const vNode = createVNode(
		name,
		props,
		VNodeChildren,
		realNode,
		null,
		props.key
	);

	return vNode;
};

export const createVNode = (
	name: VirtualNodeType["name"],
	props: VirtualNodeType["props"],
	children: VirtualNodeType["children"],
	realNode?: VirtualNodeType["realNode"],
	nodeType?: VirtualNodeType["nodeType"],
	key?: KeyAttribute
): VirtualNodeType => ({
	name,
	props,
	children,
	realNode: realNode ? realNode : null,
	nodeType: nodeType ? nodeType : null,
	key: key ? key : null,
});

export const createTextVNode = (
	name: string,
	realNode?: VirtualNodeType["realNode"]
) => createVNode(name, {}, [], realNode, TEXT_NODE);
