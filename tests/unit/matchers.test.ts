import 'mocha';
import { expect } from 'chai';
import { ZxcvbnFactory, type OptionsType } from '@zxcvbn-ts/core';
import {
  uppercaseMatcher,
  lowercaseMatcher,
  numberMatcher,
  specialMatcher,
  minLengthMatcher,
  customMatchersTranslations,
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
  uppercaseRequired: uppercaseMatcher,
};
const mergedTranslations = merge({}, baseTranslations, customMatchersTranslations);
const options: OptionsType = { translations: mergedTranslations };
const zxcvbn = new ZxcvbnFactory(options, customMatchers);

describe('Password Validation Requirements', () => {
  describe('Uppercase Character Requirement', () => {
    it('should detect when uppercase letters are missing', () => {
      const result = zxcvbn.check('password123!');
      const hasUppercaseWarning = result.feedback.warning === customMatchersTranslations.warnings.uppercaseRequired;

      expect(hasUppercaseWarning).to.be.true;
      expect(result.score).to.be.lessThan(MIN_SECURE_SCORE);
    });

    it('should pass when uppercase letter is included', () => {
      const result = zxcvbn.check('Password123!');
      const hasUppercaseWarning = result.feedback.warning === customMatchersTranslations.warnings.uppercaseRequired;

      expect(hasUppercaseWarning).to.be.false;
    });
  });

  describe('Lowercase Character Requirement', () => {
    it('should detect when lowercase letters are missing', () => {
      const result = zxcvbn.check('PASSWORD123!');
      const hasLowercaseWarning = result.feedback.warning === customMatchersTranslations.warnings.lowercaseRequired;

      expect(hasLowercaseWarning).to.be.true;
      expect(result.score).to.be.lessThan(MIN_SECURE_SCORE);
    });

    it('should pass when lowercase letter is included', () => {
      const result = zxcvbn.check('PASSWORd123!');
      const hasLowercaseWarning = result.feedback.warning === customMatchersTranslations.warnings.lowercaseRequired;

      expect(hasLowercaseWarning).to.be.false;
    });
  });

  describe('Number Requirement', () => {
    it('should detect when numbers are missing', () => {
      const result = zxcvbn.check('Passwdfsgsdfgdsfgord!');
      const hasNumberWarning = result.feedback.warning === customMatchersTranslations.warnings.numberRequired;

      expect(hasNumberWarning).to.be.true;
      expect(result.score).to.be.lessThan(MIN_SECURE_SCORE);
    });

    it('should pass when number is included', () => {
      const result = zxcvbn.check('Password1!');
      const hasNumberWarning = result.feedback.warning === customMatchersTranslations.warnings.numberRequired;

      expect(hasNumberWarning).to.be.false;
    });
  });

  describe('Special Character Requirement', () => {
    it('should detect when special characters are missing', () => {
      const result = zxcvbn.check('Password0123456');
      const hasSpecialWarning = result.feedback.warning === customMatchersTranslations.warnings.specialRequired;

      expect(hasSpecialWarning).to.be.true;
      expect(result.score).to.be.lessThan(MIN_SECURE_SCORE);
    });

    it('should pass when special character is included', () => {
      const result = zxcvbn.check('Password123!');
      const hasSpecialWarning = result.feedback.warning === customMatchersTranslations.warnings.specialRequired;

      expect(hasSpecialWarning).to.be.false;
    });
  });

  describe('Minimum Length Requirement', () => {
    it('should detect passwords shorter than minimum length', () => {
      const result = zxcvbn.check('short');
      const expectedWarning = customMatchersTranslations.warnings.minLength.replace('%s', String(MIN_LENGTH));
      const hasLengthWarning = result.feedback.warning === expectedWarning;

      expect(hasLengthWarning).to.be.true;
      expect(result.score).to.be.lessThan(MIN_SECURE_SCORE);
    });

    it('should pass for passwords meeting minimum length', () => {
      const result = zxcvbn.check('longenoughpassword');
      const hasLengthWarning = result.feedback.warning === customMatchersTranslations.warnings.minLength;

      expect(hasLengthWarning).to.be.false;
    });
  });

  describe('Combined Requirements', () => {
    it('should pass all requirements for a compliant password', () => {
      const result = zxcvbn.check(SAMPLE_STRONG_PASSWORD);

      expect(result.feedback.warning).to.be.null;
      expect(result.score).to.equal(PERFECT_SCORE);
    });

    it('should detect multiple missing requirements', () => {
      const result = zxcvbn.check('password');

      expect(result.feedback.warning).to.not.be.undefined;
      expect(result.score).to.be.lessThan(MIN_SECURE_SCORE);
    });
  });
});
