import { Matcher, Match } from '@zxcvbn-ts/core';
import { MatcherNames } from '../matcherNames';

const matcher = MatcherNames.minLength;
export const minLengthMatcher = (minLength: number): Matcher => ({
  Matching: class MinLengthMatcher {
    match({ password }: { password: string }): Match[] {
      const matches: Match[] = [];
      if (password.length < minLength) {
        matches.push({ pattern: matcher, token: password, i: 0, j: password.length - 1 });
      }
      return matches;
    }
  },
  feedback: options => {
    return {
      warning: options.translations.warnings[matcher]?.replace('%s', minLength) || matcher,
      suggestions: [options.translations.suggestions[matcher]?.replace('%s', minLength) || matcher],
    };
  },
  scoring() {
    return -100;
  },
});
