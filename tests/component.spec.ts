import { Objectable } from "../src";
import { getComponent, addComponents, ComponentParams, ProtoComponent } from "../src/component";

it("should render some HTML", () => {
  var html = Objectable.render({
    $: [
      {
        H1: {
          $: ["Title"],
        },
      },
      {
        H2: {
          $: ["Title2", "Title3"],
        },
      },
    ],
  });

  expect(html).toEqual("<h1>Title</h1><h2>Title2Title3</h2>");
});

it("should add a custom component", () => {
  function TestComp(component: ComponentParams): ProtoComponent {
    return {
      $: [
        {
          P: {
            $: [component.params.text],
          },
        }
      ]
    };
  }
  addComponents({ TestComp: TestComp });
  expect(getComponent("TestComp")).toBeDefined();

  var html = Objectable.render({
    $: [
      {
        TestComp: {
          params: {
            text: "Test",
          }
        },
      },
    ],
  });

  expect(html).toEqual("<p>Test</p>");
});
