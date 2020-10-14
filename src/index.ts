import { addComponents, AdditionalParams, Component, ProtoComponent } from "./component";
import { AddPropTransform } from './html'; 

export {ProtoComponentParams, ProtoComponent, ComponentParams, Component} from './component';

module.exports = {
  render: (component: ProtoComponent) => {
    var comp = new Component(component, 'Root');
    return comp.render(comp);
  },
  addComponents: addComponents,
  additionalParams: AdditionalParams,
  component: function (name?: string) {
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDecorator
    ) {
      addComponents({ [name ?? propertyKey]: target });
    };
  },
  addHTMLPropertyTransform: AddPropTransform,
};

// module.exports = Objectable;
