import { Matcher, Match } from '@zxcvbn-ts/core';
import { MatcherNames } from '../matcherNames';

const matcher = MatcherNames.number;
export const numberMatcher: Matcher = {
  Matching: class NumberMatcher {
    match({ password }: { password: string }): Match[] {
      const matches: Match[] = [];
      for (const char of password) {
        if (char >= '0' && char <= '9') {
          return matches;
        }
      }
      matches.push({ pattern: matcher, token: password, i: 0, j: password.length - 1 });
      return matches;
    }
  },
  feedback: options => {
    return {
      warning: options.translations.warnings[matcher] || matcher,
      suggestions: [options.translations.suggestions[matcher] || matcher],
    };
  },
  scoring() {
    return -100;
  },
};
