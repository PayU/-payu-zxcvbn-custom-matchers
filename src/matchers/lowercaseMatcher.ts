import { Matcher, Match } from '@zxcvbn-ts/core/dist/types';

export const lowercaseMatcher: Matcher = {
  Matching: class LowercaseMatcher {
    match({ password }: { password: string }): Match[] {
      const matches: Match[] = [];
      for (const char of password) {
        if (char >= 'a' && char <= 'z') {
          return matches;
        }
      }
      matches.push({ pattern: 'lowercaseRequired', token: password, i: 0, j: password.length - 1 });
      return matches;
    }
  },
  feedback: options => {
    return {
      warning: options.translations.warnings.lowercaseRequired || 'lowercaseRequired',
      suggestions: [options.translations.suggestions.lowercaseRequired || 'lowercaseRequired'],
    };
  },
  scoring(_match) {
    return -100;
  },
};
