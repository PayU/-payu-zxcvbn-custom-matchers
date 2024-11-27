import 'mocha';
import { expect } from 'chai';
import { ZxcvbnFactory, type OptionsType } from '@zxcvbn-ts/core';
import {
  uppercaseMatcher,
  lowercaseMatcher,
  numberMatcher,
  specialMatcher,
  minLengthMatcher,
  customMatchersTranslations
} from '../../src';
import { translations as baseTranslations } from '@zxcvbn-ts/language-en';
import { merge } from 'lodash';

const MIN_LENGTH = 12;
const MIN_SECURE_SCORE = 3;
const PERFECT_SCORE = 4;
const SAMPLE_STRONG_PASSWORD = 'de#dSh251dft!';

// Package setup
const customMatchers = {
  minLength: minLengthMatcher(MIN_LENGTH),
  specialRequired: specialMatcher,
  numberRequired: numberMatcher,
  lowercaseRequired: lowercaseMatcher,
  uppercaseRequired: uppercaseMatcher
};

const mergedTranslations = merge({}, baseTranslations, customMatchersTranslations);
const options: OptionsType = { translations: mergedTranslations };
const zxcvbn = new ZxcvbnFactory(options, customMatchers);


describe('Password Validation Requirements', () => {
  describe('Uppercase Character Requirement', () => {
    const testPassword = 'password123!';
    const validPassword = 'Password123!';

    it('should provide appropriate warning and suggestion when uppercase letters are missing', () => {
      const result = zxcvbn.check(testPassword);

      expect(result.feedback.warning).to.equal(customMatchersTranslations.warnings.uppercaseRequired);
      expect(result.feedback.suggestions).to.include(customMatchersTranslations.suggestions.uppercaseRequired);
      expect(result.score).to.be.lessThan(MIN_SECURE_SCORE);
    });

    it('should not show uppercase warnings or suggestions when requirement is met', () => {
      const result = zxcvbn.check(validPassword);

      expect(result.feedback.warning).to.not.equal(customMatchersTranslations.warnings.uppercaseRequired);
      expect(result.feedback.suggestions).to.not.include(customMatchersTranslations.suggestions.uppercaseRequired);
    });
  });

  describe('Lowercase Character Requirement', () => {
    const testPassword = 'PASSWORD123!';
    const validPassword = 'PASSWORd123!';

    it('should provide appropriate warning and suggestion when lowercase letters are missing', () => {
      const result = zxcvbn.check(testPassword);

      expect(result.feedback.warning).to.equal(customMatchersTranslations.warnings.lowercaseRequired);
      expect(result.feedback.suggestions).to.include(customMatchersTranslations.suggestions.lowercaseRequired);
      expect(result.score).to.be.lessThan(MIN_SECURE_SCORE);
    });

    it('should not show lowercase warnings or suggestions when requirement is met', () => {
      const result = zxcvbn.check(validPassword);

      expect(result.feedback.warning).to.not.equal(customMatchersTranslations.warnings.lowercaseRequired);
      expect(result.feedback.suggestions).to.not.include(customMatchersTranslations.suggestions.lowercaseRequired);
    });
  });

  describe('Number Requirement', () => {
    const testPassword = 'Passwdfsgsdfgdsfgord!';
    const validPassword = 'Password1!';

    it('should provide appropriate warning and suggestion when numbers are missing', () => {
      const result = zxcvbn.check(testPassword);

      expect(result.feedback.warning).to.equal(customMatchersTranslations.warnings.numberRequired);
      expect(result.feedback.suggestions).to.include(customMatchersTranslations.suggestions.numberRequired);
      expect(result.score).to.be.lessThan(MIN_SECURE_SCORE);
    });

    it('should not show number warnings or suggestions when requirement is met', () => {
      const result = zxcvbn.check(validPassword);

      expect(result.feedback.warning).to.not.equal(customMatchersTranslations.warnings.numberRequired);
      expect(result.feedback.suggestions).to.not.include(customMatchersTranslations.suggestions.numberRequired);
    });
  });

  describe('Special Character Requirement', () => {
    const testPassword = 'Password0123456';
    const validPassword = 'Password123!';

    it('should provide appropriate warning and suggestion when special characters are missing', () => {
      const result = zxcvbn.check(testPassword);

      expect(result.feedback.warning).to.equal(customMatchersTranslations.warnings.specialRequired);
      expect(result.feedback.suggestions).to.include(customMatchersTranslations.suggestions.specialRequired);
      expect(result.score).to.be.lessThan(MIN_SECURE_SCORE);
    });

    it('should not show special character warnings or suggestions when requirement is met', () => {
      const result = zxcvbn.check(validPassword);

      expect(result.feedback.warning).to.not.equal(customMatchersTranslations.warnings.specialRequired);
      expect(result.feedback.suggestions).to.not.include(customMatchersTranslations.suggestions.specialRequired);
    });
  });

  describe('Minimum Length Requirement', () => {
    const testPassword = 'short';
    const validPassword = 'longenoughpassword';

    it('should provide appropriate warning and suggestion for short passwords', () => {
      const result = zxcvbn.check(testPassword);
      const expectedWarning = customMatchersTranslations.warnings.minLength.replace('%s', String(MIN_LENGTH));
      const expectedSuggestion = customMatchersTranslations.suggestions.minLength.replace('%s', String(MIN_LENGTH));

      expect(result.feedback.warning).to.equal(expectedWarning);
      expect(result.feedback.suggestions).to.include(expectedSuggestion);
      expect(result.score).to.be.lessThan(MIN_SECURE_SCORE);
    });

    it('should not show length warnings or suggestions when requirement is met', () => {
      const result = zxcvbn.check(validPassword);
      const unexpectedWarning = customMatchersTranslations.warnings.minLength.replace('%s', String(MIN_LENGTH));
      const unexpectedSuggestion = customMatchersTranslations.suggestions.minLength.replace('%s', String(MIN_LENGTH));

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
