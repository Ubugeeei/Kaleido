import {
	ElementAttachedNeedAttr,
	DOMAttributeName,
} from "../vNode.interface";

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
