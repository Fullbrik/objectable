var Objectable = require("../src");
import {
	getComponent,
	addComponents,
	ComponentParams,
	ProtoComponent,
	Component,
} from "../src/component";

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
	function TestComp(params: ComponentParams): ProtoComponent {
		return {
			$: [
				{
					P: {
						$: [params.params.text],
					},
				},
			],
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
					},
				},
			},
		],
	});

	expect(html).toEqual("<p>Test</p>");
});

it('should have tags', () => {
	var comp = new Component({
		$: [],
		tags: "You're it"
	}, 'Root');

	expect(comp.tags).toEqual("You're it");
})

it("should also add params children", () => {
	function GlorifiedDiv(params: ComponentParams): ProtoComponent {
		return {
			$: [
				{
					Div: {
						$: [...params.children],
					},
				},
			],
		};
	}
	addComponents({ GlorifiedDiv: GlorifiedDiv });
	expect(getComponent("GlorifiedDiv")).toBeDefined();

	var html = Objectable.render({
		$: [
			{
				GlorifiedDiv: {
					$: [
						{
							H1: {
								$: ["Title"],
							},
							H2: {
								$: ["Title2"],
							},
						},
					],
				},
			},
		],
	});

	expect(html).toEqual("<div><h1>Title</h1><h2>Title2</h2></div>");
});

it("should have additional params", () => {
	Objectable.additionalParams.MyParam = "My Param";

	function MyH1Component(params: ComponentParams): ProtoComponent {
		return {
			$: [
				{
					H1: {
						$: [params.params.MyParam],
					},
				},
			],
		};
	}
	Objectable.addComponents({ MyH1: MyH1Component });

	var html = Objectable.render({
		$: [
			{
				MyH1: {},
			},
		],
	});

	expect(html).toEqual("<h1>My Param</h1>");
});

it("should get the H1 children without recursion", () => {
	var comp = new Component(
		{
			$: [
				{
					H1: {
						$: ["1"],
					},
					Div: {
						$: [
							{
								H1: {
									$: ["11"],
								},
							},
						],
					},
				},
				{
					H1: {
						$: ["2"],
					},
					Div: {
						$: [
							{
								H1: {
									$: ["21"],
								},
							},
						],
					},
				},
				{
					H1: {
						$: ["3"],
					},
					Div: {
						$: [
							{
								H1: {
									$: ["31"],
								},
							},
						],
					},
				},
			],
		},
		"comp"
	);

	expect(comp.getComponentOfName("H1", false).length).toEqual(3);
});

it("should get the H1 children with recursion", () => {
	var comp = new Component(
		{
			$: [
				{
					H1: {
						$: ["1"],
					},
					Div: {
						$: [
							{
								H1: {
									$: ["11"],
								},
							},
						],
					},
				},
				{
					H1: {
						$: ["2"],
					},
					Div: {
						$: [
							{
								H1: {
									$: ["21"],
								},
							},
						],
					},
				},
				{
					H1: {
						$: ["3"],
					},
					Div: {
						$: [
							{
								H1: {
									$: ["31"],
								},
							},
						],
					},
				},
			],
		},
		"comp"
	);

	expect(comp.getComponentOfName("H1", true).length).toEqual(6);
});
