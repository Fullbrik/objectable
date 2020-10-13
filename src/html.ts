import htmlTags = require("html-tags");
import { ComponentParams, ProtoComponent } from "./component";
import { HTMLProps } from "./htmlprops";
import { CssProps } from "./cssprops";

function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function HTMLElement(element: string) {
	return function (params: ComponentParams): ProtoComponent {
		function addItem(type: string, item: string) {
			switch (type) {
				case "className":
				case "class":
					addClass(item);
					break;

				case "style":
					addStyle(item);
					break;

				default:
					break;
			}
		}

		var classNames: string[] = [];
		function addClass(className: string) {
			classNames.push(className);
		}

		var styles: string[] = [];
		function addStyle(style: string) {
			styles.push(style);
		}

		return {
			render: (component) => {
				if (params != null && params.children != null) {
					var childRenders = params.children
						.map((child) => {
							if (child.render != null) return child.render(child);
							else return "";
						})
						.join("");

					var props = `${getProps(params.params, addItem)}${getCss(
						styles
					)}${getClass(params.params.className, classNames)}`;

					return `<${element.toLowerCase()}${props}>${childRenders}</${element.toLowerCase()}>`;
				} else {
					return "";
				}
			},
			tags: [
				"HTML",
				{
					element: element,
					id: params.params.id ?? "",
				},
			],
		};
	};
}

export var HTMLElements: string[] = [...htmlTags.map((t) => capitalize(t))];

export function bindHTMLComponents(Components: any) {
	HTMLElements.forEach((el) => (Components[el] = HTMLElement(el)));
}

function getCss(styles: string[]): string {
	var ret = styles.join(";");

	if (ret.length > 0) {
		return ` style="${ret};"`;
	} else {
		return "";
	}
}

type addFunc = (type: string, item: string) => void;

var PropTransforms: ((
	name: string,
	prop: any,
	add: addFunc
) => string | null)[] = [
	(name, prop, add) => {
		if (
			HTMLProps.includes(name) &&
			(typeof prop === "string" ||
				typeof prop === "number" ||
				typeof prop === "boolean")
		)
			return ` ${name}="${prop}"`;
		else return null;
	},
	(name, prop, add) => {
		if (
			CssProps.includes(name) &&
			(typeof prop === "string" ||
				typeof prop === "number" ||
				typeof prop === "boolean")
		) {
			add("style", `${name}:${prop}`);
			return "";
		} else {
			return null;
		}
	},
];

export function AddPropTransform(
	transform: (name: string, prop: any, add: addFunc) => string | null
) {
	PropTransforms.push(transform);
}

function getProps(component: any, addItem: addFunc): string {
	var ret: string = "";

	Object.keys(component).forEach(
		(key) => (ret += getProp(component, key, addItem))
	);

	return ret;
}

function getProp(component: any, prop: string, addItem: addFunc): string {
	if (component[prop] == null) return "";
	else {
		return (
			PropTransforms.map((trans) =>
				trans(prop, component[prop], addItem)
			).filter((val) => val != null)[0] ?? ""
		);
	}
}

function getClass(className: string, classNames: string[]): string {
	if (className == null) className = "";

	var classNamesCombined = classNames.join(" ").trim();

	if (classNamesCombined.length > 0) className += " " + classNamesCombined;

	if (className.trim().length <= 0) return "";
	else return ` class="${className.trim()}"`;
}
