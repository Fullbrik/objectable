import { Objectable } from "../src";

it('should check to exclude', () => {
    var html = Objectable.render({
        $: [
            {
                "?": {
                    params: {
                        if: true,
                        then: () => ["H1", {
                            $: ["Title"]
                        }]
                    }
                }

            },
            {
                "?": {
                    params: {
                        if: false,
                        then: () => ["H1", {
                            $: ["Title2"]
                        }]
                    }
                }
            },
        ]
    });

    expect(html).toEqual('<h1>Title</h1>');
});

it('should go to the else', () => {
    var html = Objectable.render({
        $: [
            {
                "?": {
                    params: {
                        if: false,
                        then: () => ["H1", {
                            $: ["True"]
                        }],
                        else: () => ["H1", {
                            $: ["False"]
                        }],
                    }
                }
            }
        ]
    });

    expect(html).toEqual('<h1>False</h1>');
});