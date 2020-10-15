var Objectable = require("../src");

it("should loop components", () => {
	var names = ["mcp613", "john", "james"];

	var html = Objectable.render({
		$: [
			{
				"*": {
					params: {
						for: "name",
						in: names,
						render: (data: any) => {
							return [
								"H2",
								{
									$: [data.name],
								},
							];
						},
					},
				},
			},
		],
	});

	expect(html).toEqual("<h2>mcp613</h2><h2>john</h2><h2>james</h2>");
});

it("should loop components range in array", () => {
	var names = ["mcp613", "john", "james", "max", "sam"];

	var html = Objectable.render({
		$: [
			{
				"*": {
					params: {
						for: "name",
						in: names,
						first: 1,
						last: 3,
						render: (data: any) => {
							return [
								"H2",
								{
									$: [data.name],
								},
							];
						},
					},
				},
			},
		],
	});

	expect(html).toEqual("<h2>john</h2><h2>james</h2><h2>max</h2>");
});

it("should loop components range", () => {
	var names = ["mcp613", "john", "james", "max", "sam"];

	var html = Objectable.render({
		$: [
			{
				"*": {
					params: {
						first: 1,
						last: 3,
						render: (data: any) => {
							return [
								"H2",
								{
									$: [names[data.index]],
								},
							];
						},
					},
				},
			},
		],
	});

	expect(html).toEqual("<h2>john</h2><h2>james</h2><h2>max</h2>");
});
