import {
	ElementAttachedNeedAttr,
	DOMAttributeName,
	DOMAttributes,
	VirtualNodeType,
	ExpandElement,
} from "./vNode.interface";

export const updateOnlyThisNode = (
	realNode: VirtualNodeType["realNode"],
	oldVNode: VirtualNodeType,
	newVNode: VirtualNodeType
): ExpandElement | null => {
	if (!realNode) {
		console.error("Error! realNode is null.");
		return null;
	}

	for (const propName in mergeProperties(
		oldVNode.props,
		newVNode.props
	)) {
		let compareValue: DOMAttributes | string | boolean;
		// inputやcheckbox等の入力
		if (propName === "value" || propName === "checked") {
			compareValue = (realNode as HTMLInputElement)[propName];
		} else if (propName === "selected") {
			compareValue = (realNode as HTMLOptionElement)[propName];
		} else {
			compareValue = oldVNode.props[propName];
		}

		if (compareValue === newVNode.props) return null;

		patchProperty(
			realNode as ElementAttachedNeedAttr,
			propName,
			oldVNode.props[propName],
			newVNode.props[propName]
		);
	}

	return realNode;
};

export const mergeProperties = (
	oldProps: DOMAttributes,
	newProp: DOMAttributes
) => {
	const mergedProperties: DOMAttributes = {};

	for (const propName in oldProps) {
		mergedProperties[propName] = oldProps[propName];
	}

	for (const propName in newProp) {
		mergedProperties[propName] = newProp[propName];
	}

	return mergedProperties;
};

export const patchProperty = (
	realNode: ElementAttachedNeedAttr,
	propName: DOMAttributeName,
	oldPropValue: any,
	newPropValue: any
) => {
	if (propName === "key") return;

	if (propName[0] === "o" && propName[1] === "n") {
		const eventName = propName.slice(2).toLowerCase();

		if (!realNode.eventHandlers) realNode.eventHandlers = {};

		realNode.eventHandlers[eventName] = newPropValue;

		if (!newPropValue) {
			realNode.removeEventListener(eventName, listenerFunc);
		} else if (!oldPropValue) {
			realNode.addEventListener(eventName, listenerFunc);
		}
	} else if (!newPropValue) {
		realNode.removeAttribute(propName);
	} else {
		realNode.setAttribute(propName, newPropValue);
	}
};

const listenerFunc = (event: Event) => {
	const realNode = event.currentTarget as ElementAttachedNeedAttr;
	if (realNode.eventHandlers)
		realNode.eventHandlers[event.type](event);
};
