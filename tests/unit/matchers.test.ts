import 'mocha';
import { expect } from 'chai';
import { ZxcvbnFactory, type OptionsType } from '@zxcvbn-ts/core';
import {
  specialMatcher,
  numberMatcher,
  uppercaseMatcher,
  lowercaseMatcher,
  minLengthMatcher,
  maxLengthMatcher,
  MatchersTranslations,
  MatcherNames,
} from '../../src';
import { translations as baseTranslations } from '@zxcvbn-ts/language-en';
import { merge } from 'lodash';

const MIN_LENGTH = 12;
const MAX_LENGTH = 50;
const MIN_SECURE_SCORE = 3;
const PERFECT_SCORE = 4;
const SAMPLE_STRONG_PASSWORD = 'de#dSh251dft!';

// Package setup
const customMatchers = {
  [MatcherNames.minLength]: minLengthMatcher(MIN_LENGTH),
  [MatcherNames.maxLength]: maxLengthMatcher(MAX_LENGTH),
  [MatcherNames.specialChar]: specialMatcher,
  [MatcherNames.number]: numberMatcher,
  [MatcherNames.lowercase]: lowercaseMatcher,
  [MatcherNames.uppercase]: uppercaseMatcher,
};

const mergedTranslations = merge({}, baseTranslations, MatchersTranslations);
const options: OptionsType = { translations: mergedTranslations };
const zxcvbn = new ZxcvbnFactory(options, customMatchers);

describe('Password Validation Requirements', () => {
  describe('Uppercase Character Requirement', () => {
    const testPassword = 'password123!';
    const validPassword = 'Password123!';

    it('should provide appropriate warning and suggestion when uppercase letters are missing', () => {
      const result = zxcvbn.check(testPassword);

      console.info(result.feedback);
      expect(result.feedback.warning).to.equal(MatchersTranslations.warnings.uppercase);
      expect(result.feedback.suggestions).to.include(MatchersTranslations.suggestions.uppercase);
      expect(result.score).to.be.lessThan(MIN_SECURE_SCORE);
    });

    it('should not show uppercase warnings or suggestions when requirement is met', () => {
      const result = zxcvbn.check(validPassword);

      expect(result.feedback.warning).to.not.equal(MatchersTranslations.warnings.uppercase);
      expect(result.feedback.suggestions).to.not.include(MatchersTranslations.suggestions.uppercase);
    });
  });

  describe('Lowercase Character Requirement', () => {
    const testPassword = 'PASSWORD123!';
    const validPassword = 'PASSWORd123!';

    it('should provide appropriate warning and suggestion when lowercase letters are missing', () => {
      const result = zxcvbn.check(testPassword);

      expect(result.feedback.warning).to.equal(MatchersTranslations.warnings.lowercase);
      expect(result.feedback.suggestions).to.include(MatchersTranslations.suggestions.lowercase);
      expect(result.score).to.be.lessThan(MIN_SECURE_SCORE);
    });

    it('should not show lowercase warnings or suggestions when requirement is met', () => {
      const result = zxcvbn.check(validPassword);

      expect(result.feedback.warning).to.not.equal(MatchersTranslations.warnings.lowercase);
      expect(result.feedback.suggestions).to.not.include(MatchersTranslations.suggestions.lowercase);
    });
  });

  describe('Number Requirement', () => {
    const testPassword = 'Passwdfsgsdfgdsfgord!';
    const validPassword = 'Password1!';

    it('should provide appropriate warning and suggestion when numbers are missing', () => {
      const result = zxcvbn.check(testPassword);

      expect(result.feedback.warning).to.equal(MatchersTranslations.warnings.number);
      expect(result.feedback.suggestions).to.include(MatchersTranslations.suggestions.number);
      expect(result.score).to.be.lessThan(MIN_SECURE_SCORE);
    });

    it('should not show number warnings or suggestions when requirement is met', () => {
      const result = zxcvbn.check(validPassword);

      expect(result.feedback.warning).to.not.equal(MatchersTranslations.warnings.number);
      expect(result.feedback.suggestions).to.not.include(MatchersTranslations.suggestions.number);
    });
  });

  describe('Special Character Requirement', () => {
    const testPassword = 'Password0123456';
    const validPassword = 'Password123!';

    it('should provide appropriate warning and suggestion when special characters are missing', () => {
      const result = zxcvbn.check(testPassword);

      expect(result.feedback.warning).to.equal(MatchersTranslations.warnings.specialChar);
      expect(result.feedback.suggestions).to.include(MatchersTranslations.suggestions.specialChar);
      expect(result.score).to.be.lessThan(MIN_SECURE_SCORE);
    });

    it('should not show special character warnings or suggestions when requirement is met', () => {
      const result = zxcvbn.check(validPassword);

      expect(result.feedback.warning).to.not.equal(MatchersTranslations.warnings.specialChar);
      expect(result.feedback.suggestions).to.not.include(MatchersTranslations.suggestions.specialChar);
    });
  });

  describe('Minimum Length Requirement', () => {
    const testPassword = 'short';
    const validPassword = 'longenoughpassword';

    it('should provide appropriate warning and suggestion for short passwords', () => {
      const result = zxcvbn.check(testPassword);
      const expectedWarning = MatchersTranslations.warnings.minLength.replace('%s', String(MIN_LENGTH));
      const expectedSuggestion = MatchersTranslations.suggestions.minLength.replace('%s', String(MIN_LENGTH));

      expect(result.feedback.warning).to.equal(expectedWarning);
      expect(result.feedback.suggestions).to.include(expectedSuggestion);
      expect(result.score).to.be.lessThan(MIN_SECURE_SCORE);
    });

    it('should not show length warnings or suggestions when requirement is met', () => {
      const result = zxcvbn.check(validPassword);
      const unexpectedWarning = MatchersTranslations.warnings.minLength.replace('%s', String(MIN_LENGTH));
      const unexpectedSuggestion = MatchersTranslations.suggestions.minLength.replace('%s', String(MIN_LENGTH));

      expect(result.feedback.warning).to.not.equal(unexpectedWarning);
      expect(result.feedback.suggestions).to.not.include(unexpectedSuggestion);
    });
  });

  describe('Maximum Length Requirement', () => {
    const testPassword = 'a'.repeat(MAX_LENGTH) + '@A3';
    const validPassword = 'longenougS2@hpassword';

    it('should provide appropriate warning and suggestion for long passwords', () => {
      const result = zxcvbn.check(testPassword);
      const expectedWarning = MatchersTranslations.warnings.maxLength.replace('%s', String(MAX_LENGTH));
      const expectedSuggestion = MatchersTranslations.suggestions.maxLength.replace('%s', String(MAX_LENGTH));

      expect(result.feedback.warning).to.equal(expectedWarning);
      expect(result.feedback.suggestions).to.include(expectedSuggestion);
      expect(result.score).to.be.lessThan(MIN_SECURE_SCORE);
    });

    it('should not show length warnings or suggestions when requirement is met', () => {
      const result = zxcvbn.check(validPassword);
      const unexpectedWarning = MatchersTranslations.warnings.minLength.replace('%s', String(MAX_LENGTH));
      const unexpectedSuggestion = MatchersTranslations.suggestions.minLength.replace('%s', String(MAX_LENGTH));

      expect(result.feedback.warning).to.not.equal(unexpectedWarning);
      expect(result.feedback.suggestions).to.not.include(unexpectedSuggestion);
    });
  });

  describe('Combined Requirements', () => {
    it('should not show any warnings or suggestions for a fully compliant password', () => {
      const result = zxcvbn.check(SAMPLE_STRONG_PASSWORD);

      expect(result.feedback.warning).to.be.null;
      expect(result.feedback.suggestions).to.be.empty;
      expect(result.score).to.equal(PERFECT_SCORE);
    });

    it('should provide multiple suggestions for a weak password', () => {
      const result = zxcvbn.check('password');

      expect(result.feedback.warning).to.not.be.null;
      expect(result.feedback.suggestions).to.not.be.empty;
      expect(result.feedback.suggestions.length).to.be.greaterThan(1);
      expect(result.score).to.be.lessThan(MIN_SECURE_SCORE);
    });
  });
});
