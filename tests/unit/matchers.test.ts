import 'mocha';
import { expect } from 'chai';
import { uppercaseMatcher, lowercaseMatcher, numberMatcher, specialMatcher, minLengthMatcher } from '../../src';

describe('uppercaseMatcher', () => {
  it('should return a match for missing uppercase letters', () => {
    const result = uppercaseMatcher.Matching.prototype.match({ password: 'password123!' });
    expect(result).to.deep.include({ pattern: 'uppercaseRequired', token: 'password123!', i: 0, j: 11 });
  });

  it('should provide correct feedback for missing uppercase letters', () => {
    const match = { pattern: 'uppercaseRequired', token: 'password123!', i: 0, j: 11, guesses: 1, guessesLog10: 0 };
    const feedback = uppercaseMatcher.feedback(match);
    expect(feedback.warning).to.equal('Include at least one uppercase letter.');
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
  });

  it('should provide correct feedback for missing lowercase letters', () => {
    const match = { pattern: 'lowercaseRequired', token: 'PASSWORD123!', i: 0, j: 11, guesses: 1, guessesLog10: 0 };
    const feedback = lowercaseMatcher.feedback(match);
    expect(feedback.warning).to.equal('Include at least one lowercase letter.');
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
  });

  it('should provide correct feedback for missing numbers', () => {
    const match = { pattern: 'numberRequired', token: 'Password!', i: 0, j: 8, guesses: 1, guessesLog10: 0 };
    const feedback = numberMatcher.feedback(match);
    expect(feedback.warning).to.equal('Include at least one number.');
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
  });

  it('should provide correct feedback for missing special characters', () => {
    const match = { pattern: 'specialRequired', token: 'Password123', i: 0, j: 10, guesses: 1, guessesLog10: 0 };
    const feedback = specialMatcher.feedback(match);
    expect(feedback.warning).to.equal('Include at least one special character.');
  });

  it('should return a score of -100 for missing special characters', () => {
    const match = { pattern: 'specialRequired', token: 'Password123', i: 0, j: 10 };
    const score = specialMatcher.scoring(match);
    expect(score).to.equal(-100);
  });
});

describe('minLengthMatcher', () => {
  const minLength = 10;
  const matcher = minLengthMatcher(minLength);

  it('should return a match for passwords shorter than the minimum length', () => {
    const result = matcher.Matching.prototype.match({ password: 'short' });
    expect(result).to.deep.include({ pattern: 'minLength', token: 'short', i: 0, j: 4 });
  });

  it('should return no matches for passwords meeting the minimum length', () => {
    const result = matcher.Matching.prototype.match({ password: 'longenoughpassword' });
    expect(result).to.be.empty;
  });

  it('should provide correct feedback for passwords shorter than the minimum length', () => {
    const match = { pattern: 'minLength', token: 'short', i: 0, j: 4, guesses: 1, guessesLog10: 0 };
    const feedback = matcher.feedback(match);
    expect(feedback.warning).to.equal('Password may not be shorter than 10 characters.');
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
