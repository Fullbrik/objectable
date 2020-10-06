names = ["John", "Jacob", "Suzan", "Karen"];
showExtras = false;

document.getElementById("content").innerHTML = Objectable.render({
	$: [
		{
			Header: {
				params: {
					display: "flex",
					"background-color": "#11FF11",
					width: "100vw",
					padding: "10px",
					"text-align": "center",
				},
				$: [
					{
						H1: {
							params: {
								flex: 1,
							},
							$: ["Templated Site."],
						},
					},
				],
			},
			H2: {
				params: {
					"padding-left": "10px",
				},
				$: ["Change the variables in the js file to change this site."],
			},
			Br: {},
		},
		{
			H2: {
				params: {
					"padding-left": "10px",
				},
				$: ["Looping through the names array:"],
			},
			Div: {
				params: { margin: "10px" },
			},
			Ul: {
				$: [
					{
						"*": {
							params: {
								for: "name",
								in: names,
								render: function (loop) {
									return [
										"Li",
										{
											$: [loop.name],
										},
									];
								},
							},
						},
					},
				],
			},
		},
		{
			Br: {},
			H2: {
				params: {
					"padding-left": "10px",
				},
				$: ["Showing extra content based on the value of showExtras:"],
			},
			Div: {
				params: {
					"padding-left": "10px",
				},
				$: [
					{
						Div: {
							params: { margin: "10px" },
						},
						"?": {
							params: {
								if: showExtras,
								then: () => {
									return ["H3", { $: ["TODO: Insert cool content here."] }];
								},
								else: () => {
									return [
										"H3",
										{
											$: [
												"Sorry link, I can't render extras. Come back when showExtras is a little, mmmmmmmm... truer.",
											],
										},
									];
								},
							},
						},
					},
				],
			},
		},
	],
});
