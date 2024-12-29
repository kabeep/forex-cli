import { type Assertion, describe, expect, it } from 'vitest';
import { normalizeAmount } from '../../src/helper';

const expectFunction = (input: string | number): Assertion =>
    expect(normalizeAmount(input));

const testFunction = (_: string, input: string | number, expected: number) => {
    expectFunction(input).toBe(expected);
};

describe('Number Cases', () => {
    it.each([
        ['Integer', 1000, 1000],
        ['Float', 1000.01, 1000.01],
        ['Float String', '1000.01', 1000.01],
    ])('%s: %s -> %d', testFunction);
});

describe('Digit Formatting Cases', () => {
    it.each([
        ['Integer String', '1_000', 1000],
        ['Float String', '1_000.01', 1000.01],
    ])('%s: %s -> %d', testFunction);
});

describe('Scientific Notation Cases', () => {
    it.each([
        ['Integer', 1e3, 1000],
        ['Float', 1.00001e3, 1000.01],
        ['Float String', '1.00001e3', 1000.01],
    ])('%s: %s -> %d', testFunction);
});

describe('Statistical Formatting Cases', () => {
    it.each([
        ['Integer String', '1,000,000', 1000000],
        ['Float String', '1,000,000.01', 1000000.01],
    ])('%s: %s -> %d', testFunction);
});

describe('Financial Abbreviations Cases', () => {
    it.each([
        ['Integer String', '1k', 1000],
        ['Float String', '1k.01', 1000.01],
        ['Combined Units', '1b1m1k1.01', 1001001001.01],
        ['Wrong Order', '10k5.5m.01', 5510000.01],
    ])('%s: %s -> %d', testFunction);
});

describe('Invalid Cases', () => {
    it.each([
        ['Case 1', 'invalid', Number.NaN],
        ['Case 2', 'foo001', Number.NaN],
    ])('%s: %s -> %d', testFunction);
});
