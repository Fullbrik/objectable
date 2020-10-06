var links = [
	{ name: "Static site", href: "./simple-static-site.html" },
	{ name: "Custom Component", href: "./simple-custom-component.html" },
	{ name: "Templated", href: "./simple-templated-site.html" },
	{ name: "Bindings", href: "./simple-button-bindings.html" },
	{ name: "More to come...", href: "" },
];

document.getElementById("content").innerHTML = Objectable.render({
	$: [
		{
			Header: {
				params: {
					"text-align": "center",
					"background-color": "#11FF11",
				},
				$: [
					{
						H1: {
							$: ["Simple examples"],
						},
					},
				],
			},
			Div: {
				params: {
					display: "grid",
					width: "100%",
					"grid-template-columns": "1fr 1fr",
					"column-gap": "10px",
					"row-gap": "10px",
				},
				$: [
					{
						"*": {
							params: {
								for: "link",
								in: links,
								render: (loop) => [
									"A",
									{
										params: {
											href: loop.link.href,
										},
										$: [
											{
												Span: {
													params: {
														flex: 1,
														padding: "1rem",
													},
													$: [loop.link.name],
												},
											},
										],
									},
								],
							},
						},
					},
				],
			},
		},
	],
});
