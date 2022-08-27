import { rootComponentInstance } from "~/src/core/root";
import { createElement } from "./createElement";
import {
	VirtualNodeType,
	ElementAttachedNeedAttr,
} from "./interface";

export type FC<P> = (props?: P & { children?: VirtualNodeType[] }, context?: any) => VirtualNodeType;

export const render = (
	vNodeRender: FC<{}>,
	realNode?: ElementAttachedNeedAttr | null
) => {
	rootComponentInstance.mount(vNodeRender, realNode);
	rootComponentInstance.render();
};

export default {
	createElement,
	render,
};
