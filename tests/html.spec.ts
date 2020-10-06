import { Objectable } from "../src";
import { getComponent } from "../src/component";
import { HTMLElements } from "../src/html";

it("should get each HTML element", () => {
	HTMLElements.forEach((el) => {
		expect(getComponent(el) != null).toBeTruthy();
	});
});

it("should have some styling", () => {
	var html = Objectable.render({
		$: [
			{
				H1: {
					$: ["Title"],
				},
			},
			{
				Span: {
					params: {
						flex: 1,
					},
				},
			},
			{
				P: {
					$: ["Paragraph"],
				},
			},
		],
	});

	expect(html).toEqual(
		'<h1>Title</h1><span style="flex:1;"></span><p>Paragraph</p>'
	);
});

it("should have some props", () => {
	var html = Objectable.render({
		$: [
			{
				A: {
					params: {
						href: "https://google.com"
					},
					$: ["Click Me!"],
				},
				Img: {
					params: {
						src: "https://www.shorturl.at/img/shorturl-square.png",
					}
				},
			},
		],
	});

	expect(html).toEqual(
		'<a href="https://google.com">Click Me!</a><img src="https://www.shorturl.at/img/shorturl-square.png"></img>'
	);
});

it('should transform props', () => {
	Objectable.addHTMLPropertyTransform((name, prop, add) => {
		if(name === 'newProp'){
			if(prop)
				add('class', 'my-class');
			return '';
		}
		else{
			return null;
		}
	});

	Objectable.addHTMLPropertyTransform((name, prop, add) => {
		if(name === 'myColor' && typeof prop === 'string'){
				add('style', `color: ${prop}`);
			return '';
		}
		else{
			return null;
		}
	});

	var html = Objectable.render({
		$: [
			{
				H1: {
					params: {
						newProp: true
					},
					$: ["Title1"]
				},
				H2: {
					params: {
						newProp: false,
						myColor: 'blue'
					},
					$: ["Title2"]
				}
			}
		]
	});

	expect(html).toEqual('<h1 class="my-class">Title1</h1><h2 style="color: blue;">Title2</h2>');
});
