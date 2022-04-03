import * as deepEqual from "fast-deep-equal";
import { TEXT_NODE } from "./createElement";
import { createRealNodeFromVNode } from "./createRealNode";
import { createVNodeFromRealElement } from "./createVNode";
import { updateOnlyThisNode } from "./patch";
import {
	ElementAttachedNeedAttr,
	ExpandElement,
	KeyAttribute,
	VirtualNodeType,
} from "./interface";

export const render = (
	newVNode: VirtualNodeType,
	realNode: ElementAttachedNeedAttr
) => {
	if (!realNode.parentElement)
		throw new Error("Error! realNode does not have parentNode.");

	const vNode = createVNodeFromRealElement(realNode);
	const oldVNode = realNode.vdom ? realNode.vdom : { ...vNode };

	vNode.children = [newVNode];
	newVNode = vNode;

	console.debug("loop");
	renderNode(realNode.parentElement, realNode, oldVNode, newVNode);
};

const renderNode = (
	parentNode: HTMLElement,
	realNode: VirtualNodeType["realNode"],
	oldVNode: VirtualNodeType | null,
	newVNode: VirtualNodeType
) => {
	// do none
	if (deepEqual(newVNode, oldVNode)) return;

	// render text
	if (
		oldVNode &&
		newVNode.nodeType === TEXT_NODE &&
		oldVNode.nodeType === TEXT_NODE
	) {
		if (oldVNode.name === newVNode.name) return;
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

	// mutate element
	else if (realNode) {
		realNode = mutateElement(realNode, oldVNode, newVNode);
	}

	if (realNode) {
		newVNode.realNode = realNode;
		realNode.vdom = newVNode;
	}
};

const renderTextNode = (
	realNode: VirtualNodeType["realNode"],
	newVNode: VirtualNodeType
): ExpandElement | null => {
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

const mutateElement = (
	realNode: VirtualNodeType["realNode"],
	oldVNode: VirtualNodeType,
	newVNode: VirtualNodeType
): VirtualNodeType["realNode"] => {
	const newRealNode = updateOnlyThisNode(
		realNode,
		oldVNode,
		newVNode
	);

	if (!newRealNode) throw new Error("realNode is null.");

	// index for compare new VNode and old VNode
	let oldChildCurrentIndex = 0;
	let newChildCurrentIndex = 0;
	const oldChildrenLength = oldVNode.children.length;
	const newChildrenLength = newVNode.children.length;

	const hasKeyOldChildren: Map<
		KeyAttribute,
		VirtualNodeType
	> = new Map();

	for (const child of oldVNode.children) {
		const childKey = child.key;
		if (!childKey) continue;
		hasKeyOldChildren.set(childKey, child);
	}

	const renderedNewChildren: Map<
		KeyAttribute,
		"isRendered"
	> = new Map();

	while (newChildCurrentIndex < newChildrenLength) {
		let oldChildVNode: VirtualNodeType | null;
		let oldKey: string | number | null;
		if (!oldVNode.children[oldChildCurrentIndex]) {
			oldChildVNode = null;
			oldKey = null;
		} else {
			oldChildVNode = oldVNode.children[oldChildCurrentIndex];
			oldKey = oldChildVNode.key;
		}
		const newChildVNode = newVNode.children[newChildCurrentIndex];
		const newKey = newChildVNode.key;

		// 既にrenderされているoldChildVNodeをスキップする
		if (oldKey && renderedNewChildren.get(oldKey) === "isRendered") {
			oldChildCurrentIndex++;
			continue;
		}

		// keyを持っていない削除するべき要素を削除する
		// ※keyを持っている削除するべき要素は最後にまとめて削除する
		if (
			newKey &&
			oldChildVNode &&
			oldChildVNode.children[oldChildCurrentIndex + 1] &&
			newKey === oldChildVNode.children[oldChildCurrentIndex + 1].key
		) {
			// keyのない要素は以前のrenderの時と同じ位置になかったら削除する
			if (!oldKey) {
				newRealNode.removeChild(
					oldChildVNode.realNode as ElementAttachedNeedAttr
				);
			}
			oldChildCurrentIndex++;
			continue;
		}

		// keyを持っていない子要素の更新処理
		if (!newKey) {
			if (!oldKey) {
				renderNode(
					realNode as ElementAttachedNeedAttr,
					oldChildVNode ? oldChildVNode.realNode : null,
					oldChildVNode,
					newChildVNode
				);
				newChildCurrentIndex++;
			}
			oldChildCurrentIndex++;
		} else {
			// 以前のrender時とkeyが変わっていなかった場合、更新
			if (oldChildVNode && oldKey === newKey) {
				const childRealNode = oldChildVNode.realNode;
				renderNode(
					realNode as ElementAttachedNeedAttr,
					childRealNode,
					oldChildVNode,
					newChildVNode
				);
				renderedNewChildren.set(newKey, "isRendered");
				oldChildCurrentIndex++;
			} else {
				const previousRenderValue = hasKeyOldChildren.get(newKey);
				// 以前のrender時には既にこのkeyを持つ要素が存在していた場合
				if (previousRenderValue) {
					renderNode(
						realNode as ElementAttachedNeedAttr,
						previousRenderValue.realNode,
						previousRenderValue,
						newChildVNode
					);
					renderedNewChildren.set(newKey, "isRendered");
				}
				// keyを持つ要素の追加処理
				else {
					renderNode(
						realNode as ElementAttachedNeedAttr,
						null,
						null,
						newChildVNode
					);
				}
				renderedNewChildren.set(newKey, "isRendered");
			}

			newChildCurrentIndex++;
		}
	}

	// 前のwhile処理で利用されなかった到達しなかったoldVNodeのindexの内keyを持っていないモノを削除
	while (oldChildCurrentIndex < oldChildrenLength) {
		const unReachOldVNode = oldVNode.children[oldChildCurrentIndex];

		if (!unReachOldVNode.key && unReachOldVNode.realNode)
			newRealNode.removeChild(unReachOldVNode.realNode);

		oldChildCurrentIndex++;
	}

	// keyをもつoldVNodeの子要素の中で新しいVNodeでは削除されているものを削除
	for (const [oldKey, oldChildVNode] of hasKeyOldChildren.entries()) {
		if (!renderedNewChildren.get(oldKey)) {
			const willRemoveNode = oldChildVNode.realNode;
			if (willRemoveNode) newRealNode.removeChild(willRemoveNode);
		}
	}

	return newRealNode;
};
