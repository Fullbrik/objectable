function customComponent(params) {
	return {
		$: [
			{
				Div: {
					params: {
						margin: 0,
						"background-color": "blue",
						"text-align": "center",
						"padding-top": "5px",
						"padding-bottom": "5px",
					},
					$: [
						{
							H1: {
								$: [params.params.text],
							},
						},
					],
				},
			},
		],
	};
}
Objectable.addComponents({ Custom: customComponent });

document.getElementById("content").innerHTML = Objectable.render({
	$: [
		{
			Custom: {
				params: {
					text: "Here is our custom component!",
				}
			},
		},
	],
});
