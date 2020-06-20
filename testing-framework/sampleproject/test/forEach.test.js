const assert = require('assert');
const { forEach } = require('../index');

let numbers;
beforeEach(() => {
    numbers = [1, 2, 3];
})

it('should sum an array', () => {
    let sum = 0;
    forEach(numbers , (element) => {
        sum += element;
    })
    assert.strictEqual(sum, 6);
    numbers.push(3);
    numbers.push(3);
});

it('beforeEach runs every time', () => {
    assert.strictEqual(numbers.length, 4);
})