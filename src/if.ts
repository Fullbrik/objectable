import { ComponentParams, ProtoComponent } from "./component";

export function IfComponent(component: ComponentParams) : ProtoComponent {
    var ifCondition = component.params.if ?? false;
    var thenFunc = component.params.then;
    var elseFunc = component.params.else;

    if (ifCondition) {
        if (thenFunc != null) {
            var thenResult: [string, any] = thenFunc();
            return {
                $: [
                    {
                        [thenResult[0]]: thenResult[1]
                    }
                ]
            };
        }
        else{
            return {};
        }
    }
    else {
        if (elseFunc != null) {
            var elseResult: [string, any] = elseFunc();
            return {
                $: [
                    {
                        [elseResult[0]]: elseResult[1]
                    }
                ]
            };
        }
        else{
            return {};
        }
    }
}