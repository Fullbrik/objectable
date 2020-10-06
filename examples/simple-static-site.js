document.getElementById("content").innerHTML = Objectable.render(
	{
		$: [
			{
				Div: {
					params: {
						margin: 0,
						"background-color": "blue",
						display: "flex",
						'justify-items': 'center',
						'align-items': 'center'
					},
					$: [
						{
							H1: {
								params: {
									'margin-left': '10px'
								},
								$: ["Here is a sample title"],
							},
							Span: {
								params: {
									flex: 1,
								},
							},
						},
						{
							A: {
								params: {
									href: "https://google.com",
									'color': 'black',
									'margin-right': '10px'
								},
								$: ["This is a link to google.com"]
							}
						}
					],
				},
			},
		],
	}
);
