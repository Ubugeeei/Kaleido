export type TEXT_NODE = 3;

export type KeyAttribute = string | number;

export type DOMAttributeName = "key" | "ref" | (string & {});

export interface DOMAttributes {
	key?: KeyAttribute;
	[prop: string]: any;
}

export interface HandlersType {
	[eventName: string]: (event: Event) => void;
}

export type ElementAttachedNeedAttr = HTMLElement & {
	vdom?: KaleidoElement;
	eventHandlers?: HandlersType;
};

export type TextAttachedVDom = Text & {
	vdom?: KaleidoElement;
};

export type ExpandElement =
	| ElementAttachedNeedAttr
	| TextAttachedVDom;

export interface KaleidoElement {
	name: HTMLElementTagNameMap | string;
	props: DOMAttributes;
	children: KaleidoElement[];
	realNode: ExpandElement | null;
	nodeType: TEXT_NODE | null;
	key: KeyAttribute | null;
}
