var num = 0;

document.getElementById("content").innerHTML = Objectable.render({
	$: [
		{
			Header: {
				params: {
					padding: "10px",
					"background-color": "#11FF11",
					"text-align": "center",
				},
				$: [
					{
						H1: {
							$: ["Simple Bindings. Note: these don't work yet because I need to make the virtual DOM."],
						},
					},
				],
			},
		},
		{
			H2: {
				$: ["Button1 - prints 'Hello World!' to the console."],
			},
			Button: {
				params: {
					onclick: (event) => {
						console.log("Hello World!");
					},
				},
				$: ["Click"],
			},
		},
		{
			H2: {
				$: ["Button2 - changes the text of the element below the button."],
			},
			Button: {
				params: {
					onclick: (event) => {
						num++;
						document.getElementById("number").innerText = num;
					},
				},
				$: ["Click"],
			},
		},
		{
			P: {
				$: [
					"Clicked: ",
					{
						Span: {
							id: "number",
							$: [`${num}`],
						},
					},
				],
			},
		},
	],
});
