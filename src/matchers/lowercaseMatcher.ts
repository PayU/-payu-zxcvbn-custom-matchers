import { Matcher, Match } from '@zxcvbn-ts/core';
import { MatcherNames } from '../matcherNames';

const matcher = MatcherNames.lowercase;
export const lowercaseMatcher: Matcher = {
  Matching: class LowercaseMatcher {
    match({ password }: { password: string }): Match[] {
      const matches: Match[] = [];
      for (const char of password) {
        if (char >= 'a' && char <= 'z') {
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
