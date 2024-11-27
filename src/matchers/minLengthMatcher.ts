import { Matcher, Match } from '@zxcvbn-ts/core';

export const minLengthMatcher = (minLength: number): Matcher => ({
  Matching: class MinLengthMatcher {
    match({ password }: { password: string }): Match[] {
      const matches: Match[] = [];
      if (password.length < minLength) {
        matches.push({ pattern: 'minLength', token: password, i: 0, j: password.length - 1 });
      }
      return matches;
    }
  },
  feedback: options => {
    return {
      warning: options.translations.warnings['minLength']?.replace('%s', minLength) || 'minLength',
      suggestions: [options.translations.suggestions['minLength']?.replace('%s', minLength) || 'minLength'],
    };
  },
  scoring() {
    return -100;
  },
});
