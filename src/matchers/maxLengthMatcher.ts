import { Matcher, Match } from '@zxcvbn-ts/core';
import { MatcherNames } from '../matcherNames';

const matcher = MatcherNames.maxLength;
export const maxLengthMatcher = (maxLength: number): Matcher => ({
  Matching: class MaxLengthMatcher {
    match({ password }: { password: string }): Match[] {
      const matches: Match[] = [];
      if (password.length > maxLength) {
        matches.push({ pattern: matcher, token: password, i: 0, j: password.length - 1 });
      }
      return matches;
    }
  },
  feedback: options => {
    return {
      warning: options.translations.warnings[matcher]?.replace('%s', maxLength) || matcher,
      suggestions: [options.translations.suggestions[matcher]?.replace('%s', maxLength) || matcher],
    };
  },
  scoring() {
    return -100;
  },
});
