const assert = require('assert');
const { italic } = require("chalk");
const render = require("../../render");

it('has text input', async () => {
    const dom = await render('index.html');
    const input = dom.window.document.querySelector('input');
    assert(input);
})

it('shows succes message with valid email', async () => {
    const dom = await render('index.html');
    const input = dom.window.document.querySelector('input');
    input.value = "bala@gmail.com";
    dom.window.document.querySelector('form').dispatchEvent(new dom.window.Event('submit'));
    const h1 = dom.window.document.querySelector('h1');
    assert.strictEqual(h1.innerHTML, 'looks good');
})

it('shows a failure message with invalid email', async () => {
    const dom = await render('index.html');
    const input = dom.window.document.querySelector('input');
    input.value = "balagmail.com";
    dom.window.document.querySelector('form').dispatchEvent(new dom.window.Event('submit'));
    const h1 = dom.window.document.querySelector('h1');
    assert.strictEqual(h1.innerHTML, 'invalid email');
})