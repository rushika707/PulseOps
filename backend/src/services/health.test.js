const test = require("node:test");
const assert = require("node:assert");

const classifyHealth = require("./health");

test("Healthy service", () => {

    assert.strictEqual(
        classifyHealth(true, 120),
        "HEALTHY"
    );

});

test("Slow service", () => {

    assert.strictEqual(
        classifyHealth(true, 800),
        "DEGRADED"
    );

});

test("Unavailable service", () => {

    assert.strictEqual(
        classifyHealth(false, 0),
        "DOWN"
    );

});