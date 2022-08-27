import { KeyAttribute, KaleidoElement } from "./interface";

export const TEXT_NODE = 3;

/**
 * create element function h
 */
export const createElement = (
	name: KaleidoElement["name"],
	props: KaleidoElement["props"],
	children: (KaleidoElement | string)[],
	realNode?: KaleidoElement["realNode"]
): KaleidoElement => {
	const VNodeChildren: KaleidoElement[] = [];
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
	name: KaleidoElement["name"],
	props: KaleidoElement["props"],
	children: KaleidoElement["children"],
	realNode?: KaleidoElement["realNode"],
	nodeType?: KaleidoElement["nodeType"],
	key?: KeyAttribute
): KaleidoElement => ({
	name,
	props,
	children,
	realNode: realNode ? realNode : null,
	nodeType: nodeType ? nodeType : null,
	key: key ? key : null,
});

export const createTextVNode = (
	name: string,
	realNode?: KaleidoElement["realNode"]
) => createVNode(name, {}, [], realNode, TEXT_NODE);
