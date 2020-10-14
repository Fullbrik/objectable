import {
	addComponents,
	AdditionalParams,
	Component,
	ProtoComponent,
} from "./component";
import { AddPropTransform } from "./html";

export {
	ProtoComponentParams,
	ProtoComponent,
	ComponentParams,
	Component,
} from "./component";

export function render(component: ProtoComponent) {
	var comp = new Component(component, "Root");
	return comp.render(comp);
}

export { addComponents } from "./component";

export var additionalParams = AdditionalParams;

export function component(name?: string) {
	return function (
		target: any,
		propertyKey: string,
		descriptor: PropertyDecorator
	) {
		addComponents({ [name ?? propertyKey]: target });
	};
}

export var addHTMLPropertyTransform = AddPropTransform;

// module.exports = Objectable;
