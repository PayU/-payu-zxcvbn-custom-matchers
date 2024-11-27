import { Matcher, Match } from '@zxcvbn-ts/core';

export const maxLengthMatcher = (maxLength: number): Matcher => ({
  Matching: class MaxLengthMatcher {
    match({ password }: { password: string }): Match[] {
      const matches: Match[] = [];
      if (password.length > maxLength) {
        matches.push({ pattern: 'maxLength', token: password, i: 0, j: password.length - 1 });
      }
      return matches;
    }
  },
  feedback: options => {
    return {
      warning: options.translations.warnings['maxLength']?.replace('%s', maxLength) || 'maxLength',
      suggestions: [options.translations.suggestions['maxLength']?.replace('%s', maxLength) || 'maxLength'],
    };
  },
  scoring() {
    return -100;
  },
});
