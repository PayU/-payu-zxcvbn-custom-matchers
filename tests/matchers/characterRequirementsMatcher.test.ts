import { expect } from 'chai';
import { characterRequirementsMatcher } from '../../src';

describe('when matching character requirements', () => {
    it('should return a match for missing uppercase letters', () => {
        const result = characterRequirementsMatcher.Matching.prototype.match({ password: 'password123!' });
        expect(result).to.deep.include({ pattern: 'uppercase', token: 'password123!', i: 0, j: 11 });
    });

    it('should return a match for missing lowercase letters', () => {
        const result = characterRequirementsMatcher.Matching.prototype.match({ password: 'PASSWORD123!' });
        expect(result).to.deep.include({ pattern: 'lowercase', token: 'PASSWORD123!', i: 0, j: 11 });
    });

    it('should return a match for missing numbers', () => {
        const result = characterRequirementsMatcher.Matching.prototype.match({ password: 'Password!' });
        expect(result).to.deep.include({ pattern: 'number', token: 'Password!', i: 0, j: 8 });
    });

    it('should return a match for missing special characters', () => {
        const result = characterRequirementsMatcher.Matching.prototype.match({ password: 'Password123' });
        expect(result).to.deep.include({ pattern: 'special', token: 'Password123', i: 0, j: 10 });
    });

    it('should return no matches for a password meeting all requirements', () => {
        const result = characterRequirementsMatcher.Matching.prototype.match({ password: 'Password123!' });
        expect(result).to.be.empty;
    });
});

describe('when providing feedback for character requirements', () => {
    it('should provide correct feedback for missing uppercase letters', () => {
        const match = { pattern: 'uppercase', token: 'password123!', i: 0, j: 11, guesses: 1, guessesLog10: 0 };
        const feedback = characterRequirementsMatcher.feedback(match);
        expect(feedback.warning).to.equal('Include at least one uppercase letter.');
    });

    it('should provide correct feedback for missing lowercase letters', () => {
        const match = { pattern: 'lowercase', token: 'PASSWORD123!', i: 0, j: 11, guesses: 1, guessesLog10: 0 };
        const feedback = characterRequirementsMatcher.feedback(match);
        expect(feedback.warning).to.equal('Include at least one lowercase letter.');
    });

    it('should provide correct feedback for missing numbers', () => {
        const match = { pattern: 'number', token: 'Password!', i: 0, j: 8, guesses: 1, guessesLog10: 0 };
        const feedback = characterRequirementsMatcher.feedback(match);
        expect(feedback.warning).to.equal('Include at least one number.');
    });

    it('should provide correct feedback for missing special characters', () => {
        const match = { pattern: 'special', token: 'Password123', i: 0, j: 10, guesses: 1, guessesLog10: 0 };
        const feedback = characterRequirementsMatcher.feedback(match);
        expect(feedback.warning).to.equal('Include at least one special character.');
    });
});
