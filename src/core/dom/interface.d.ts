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
	vdom?: VirtualNodeType;
	eventHandlers?: HandlersType;
};

export type TextAttachedVDom = Text & {
	vdom?: VirtualNodeType;
};

export type ExpandElement =
	| ElementAttachedNeedAttr
	| TextAttachedVDom;

export interface VirtualNodeType {
	name: HTMLElementTagNameMap | string;
	props: DOMAttributes;
	children: VirtualNodeType[];
	realNode: ExpandElement | null;
	nodeType: TEXT_NODE | null;
	key: KeyAttribute | null;
}
