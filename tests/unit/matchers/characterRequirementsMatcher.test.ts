import { expect } from 'chai';
import { uppercaseMatcher, lowercaseMatcher, numberMatcher, specialMatcher } from '../../../src';

describe('character requirements matchers and feedback', () => {
  it('should return a match for missing uppercase letters', () => {
    const result = uppercaseMatcher.Matching.prototype.match({ password: 'password123!' });
    expect(result).to.deep.include({ pattern: 'uppercase', token: 'password123!', i: 0, j: 11 });
  });

  it('should return a match for missing lowercase letters', () => {
    const result = lowercaseMatcher.Matching.prototype.match({ password: 'PASSWORD123!' });
    expect(result).to.deep.include({ pattern: 'lowercase', token: 'PASSWORD123!', i: 0, j: 11 });
  });

  it('should return a match for missing numbers', () => {
    const result = numberMatcher.Matching.prototype.match({ password: 'Password!' });
    expect(result).to.deep.include({ pattern: 'number', token: 'Password!', i: 0, j: 8 });
  });

  it('should return a match for missing special characters', () => {
    const result = specialMatcher.Matching.prototype.match({ password: 'Password123' });
    expect(result).to.deep.include({ pattern: 'special', token: 'Password123', i: 0, j: 10 });
  });

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

  it('should provide correct feedback for missing uppercase letters', () => {
    const match = { pattern: 'uppercase', token: 'password123!', i: 0, j: 11, guesses: 1, guessesLog10: 0 };
    const feedback = uppercaseMatcher.feedback(match);
    expect(feedback.warning).to.equal('Include at least one uppercase letter.');
  });

  it('should provide correct feedback for missing lowercase letters', () => {
    const match = { pattern: 'lowercase', token: 'PASSWORD123!', i: 0, j: 11, guesses: 1, guessesLog10: 0 };
    const feedback = lowercaseMatcher.feedback(match);
    expect(feedback.warning).to.equal('Include at least one lowercase letter.');
  });

  it('should provide correct feedback for missing numbers', () => {
    const match = { pattern: 'number', token: 'Password!', i: 0, j: 8, guesses: 1, guessesLog10: 0 };
    const feedback = numberMatcher.feedback(match);
    expect(feedback.warning).to.equal('Include at least one number.');
  });

  it('should provide correct feedback for missing special characters', () => {
    const match = { pattern: 'special', token: 'Password123', i: 0, j: 10, guesses: 1, guessesLog10: 0 };
    const feedback = specialMatcher.feedback(match);
    expect(feedback.warning).to.equal('Include at least one special character.');
  });
});
