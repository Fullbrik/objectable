import { LoopComponent } from "./loop";
import { bindHTMLComponents } from "./html";
import { IfComponent } from "./if";

export var Components: any = {
    '*': LoopComponent,
    '?': IfComponent,
};

bindHTMLComponents(Components);

export function addComponents(elements: any) {
    Components = Object.assign(Components, elements);
    ComponentNames = Object.keys(Components);
}

export var ComponentNames = Object.keys(Components);

export function getComponent(name: string): (component: ComponentParams) => ProtoComponent | undefined | null {
    return Components[name] ?? null;
}

export var AdditionalParams : any = {};

export interface ProtoComponentParams {
    $?: any[];
    params?: any;
}

export class ComponentParams {
    constructor(proto: ProtoComponentParams) {
        this.children = $ToChildren(proto.$ ?? []);
        
        this.params = proto.params ?? {};
        this.params = Object.assign(this.params, AdditionalParams);
    }

    children: Component[] = [];
    params: any;
}

export interface ProtoComponent {
    $?: any[];
    render?: (component: Component) => string;
}

export class Component {
    constructor(proto: ProtoComponent) {
        this.children = $ToChildren(proto.$ ?? []);
        if (proto.render != null) this.render = proto.render;
    }

    children: Component[] = [];
    render: (component: Component) => string = function (component) {
        return (component.children ?? []).map(child => child.render(child)).join('');
    }
}

function $ToChildren($?: any[]): Component[] {
    var children: Component[] = [];

    if ($ != null) {
        $.forEach(subComp => {
            if(subComp instanceof Component){
                children.push(subComp);
            }
            else if (typeof subComp == 'object') {
                var newChilds = Object.keys(subComp)
                    .map<Component>(key => {
                        if (getComponent(key) != null) {
                            //Convert ComponentParams to a Component.
                            return new Component(getComponent(key)(new ComponentParams(<ProtoComponentParams>subComp[key])) ?? {});
                        }
                        else {
                            throw `Component of type ${key} not be found.`;
                        }
                    });

                children = children.concat(newChilds);
            }
            else {
                children.push(EmbedText(subComp));
            }
        });
    }

    return children;
}

function EmbedText(text: string): Component {
    return new Component({
        render: (component) => text
    });
}