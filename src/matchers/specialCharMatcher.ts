import { Matcher, Match } from '@zxcvbn-ts/core';
import { MatcherNames } from '../matcherNames';

const matcher = MatcherNames.specialChar;
export const specialMatcher: Matcher = {
  Matching: class SpecialMatcher {
    match({ password }: { password: string }): Match[] {
      const matches: Match[] = [];
      const specialChars = "!@#$%^&*()_+[]{}|;:',.<>?/";
      for (const char of password) {
        if (specialChars.includes(char)) {
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
