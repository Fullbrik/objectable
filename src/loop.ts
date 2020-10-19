import { ComponentParams, ProtoComponent } from "./component";

export function LoopComponent(component: ComponentParams): ProtoComponent {
	var varName = component.params.for ?? "";
	var array = <any[]>component.params.in;
	var render = component.params.render;

	var first = component.params.first ?? -1;
	var last = component.params.last ?? Number.MAX_VALUE;

	var tags = { Templating: "Loop" };

	if (array == null) {
		array = [];
		for (let i = 0; i <= last; i++) {
			array.push(i);
		}
	}

	var components: any[] = [];

	array
		.map((elem: any, index) => {
			if (index >= first && index <= last) {
				return render({
					[varName]: elem,
					index: index,
				});
			}
		})
		.forEach((elem: [string, any]) => {
			if (elem != null) {
				components.push({
					[elem[0]]: elem[1],
				});
			}
		});

	return {
		$: components,
		tags: tags,
	};
}
