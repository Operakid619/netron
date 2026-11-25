import assert from 'node:assert/strict';
import { test } from 'node:test';
import { TextReader } from '../source/json.js';

for (const value of ['[true, false]', '[false, true]', '[null, 1]', '[  null, {"value": true}]']) {
    test(`recognizes and reads ${value}`, () => {
        for (const input of [value, new TextEncoder().encode(value)]) {
            const reader = TextReader.open(input);
            assert.ok(reader);
            assert.deepEqual(reader.read(), JSON.parse(value));
        }
    });
}

test('rejects invalid primitive spellings when reading', () => {
    assert.throws(() => TextReader.open('[truth]').read());
});
