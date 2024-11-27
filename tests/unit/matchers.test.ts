import 'mocha';
import { expect } from 'chai';
import { uppercaseMatcher, lowercaseMatcher, numberMatcher, specialMatcher, minLengthMatcher } from '../../src';
import { customMatchersTranslations } from '../../src/translations';

describe('uppercaseMatcher', () => {
  it('should return a match for missing uppercase letters', () => {
    const result = uppercaseMatcher.Matching.prototype.match({ password: 'password123!' });
    expect(result).to.deep.include({ pattern: 'uppercaseRequired', token: 'password123!', i: 0, j: 11 });
    expect(customMatchersTranslations.warnings.uppercaseRequired).to.equal(
      'At least one uppercase letter is required.',
    );
    expect(customMatchersTranslations.suggestions.uppercaseRequired).to.equal('Include at least one uppercase letter.');
  });

  it('should return a score of -100 for missing uppercase letters', () => {
    const match = { pattern: 'uppercaseRequired', token: 'password123!', i: 0, j: 11 };
    const score = uppercaseMatcher.scoring(match);
    expect(score).to.equal(-100);
  });
});

describe('lowercaseMatcher', () => {
  it('should return a match for missing lowercase letters', () => {
    const result = lowercaseMatcher.Matching.prototype.match({ password: 'PASSWORD123!' });
    expect(result).to.deep.include({ pattern: 'lowercaseRequired', token: 'PASSWORD123!', i: 0, j: 11 });
    expect(customMatchersTranslations.warnings.lowercaseRequired).to.equal(
      'At least one lowercase letter is required.',
    );
    expect(customMatchersTranslations.suggestions.lowercaseRequired).to.equal('Include at least one lowercase letter.');
  });

  it('should return a score of -100 for missing lowercase letters', () => {
    const match = { pattern: 'lowercaseRequired', token: 'PASSWORD123!', i: 0, j: 11 };
    const score = lowercaseMatcher.scoring(match);
    expect(score).to.equal(-100);
  });
});

describe('numberMatcher', () => {
  it('should return a match for missing numbers', () => {
    const result = numberMatcher.Matching.prototype.match({ password: 'Password!' });
    expect(result).to.deep.include({ pattern: 'numberRequired', token: 'Password!', i: 0, j: 8 });
    expect(customMatchersTranslations.warnings.numberRequired).to.equal('At least one number is required.');
    expect(customMatchersTranslations.suggestions.numberRequired).to.equal('Include at least one number.');
  });

  it('should return a score of -100 for missing numbers', () => {
    const match = { pattern: 'numberRequired', token: 'Password!', i: 0, j: 8 };
    const score = numberMatcher.scoring(match);
    expect(score).to.equal(-100);
  });
});

describe('specialMatcher', () => {
  it('should return a match for missing special characters', () => {
    const result = specialMatcher.Matching.prototype.match({ password: 'Password123' });
    expect(result).to.deep.include({ pattern: 'specialRequired', token: 'Password123', i: 0, j: 10 });
    expect(customMatchersTranslations.warnings.specialRequired).to.equal('At least one special character is required.');
    expect(customMatchersTranslations.suggestions.specialRequired).to.equal('Include at least one special character.');
  });

  it('should return a score of -100 for missing special characters', () => {
    const match = { pattern: 'specialRequired', token: 'Password123', i: 0, j: 10 };
    const score = specialMatcher.scoring(match);
    expect(score).to.equal(-100);
  });
});

describe('minLengthMatcher', () => {
  const minLength = 12;
  const matcher = minLengthMatcher(minLength);

  it('should return a match for passwords shorter than the minimum length', () => {
    const result = matcher.Matching.prototype.match({ password: 'short' });
    expect(result).to.deep.include({ pattern: 'minLength', token: 'short', i: 0, j: 4 });
    expect(customMatchersTranslations.warnings.minLength).to.equal('Password must be at least 12 characters long.');
    expect(customMatchersTranslations.suggestions.minLength).to.equal(
      'Password may not be shorter than 12 characters.',
    );
  });

  it('should return no matches for passwords meeting the minimum length', () => {
    const result = matcher.Matching.prototype.match({ password: 'longenoughpassword' });
    expect(result).to.be.empty;
  });

  it('should return a score of -100 for passwords shorter than the minimum length', () => {
    const match = { pattern: 'minLength', token: 'short', i: 0, j: 4 };
    const score = matcher.scoring(match);
    expect(score).to.equal(-100);
  });
});

describe('multiple matchers', () => {
  it('should return no matches for a password meeting all requirements', () => {
    const resultUppercase = uppercaseMatcher.Matching.prototype.match({ password: 'Password123!' });
    const resultLowercase = lowercaseMatcher.Matching.prototype.match({ password: 'Password123!' });
    const resultNumber = numberMatcher.Matching.prototype.match({ password: 'Password123!' });
    const resultSpecial = specialMatcher.Matching.prototype.match({ password: 'Password123!' });

    expect(resultUppercase).to.be.empty;
    expect(resultLowercase).to.be.empty;
    expect(resultNumber).to.be.empty;
    expect(resultSpecial).to.be.empty;
  });
});
