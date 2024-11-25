import { Matcher, Match } from '@zxcvbn-ts/core/dist/types';

export const uppercaseMatcher: Matcher = {
  Matching: class UppercaseMatcher {
    match({ password }: { password: string }): Match[] {
      const matches: Match[] = [];
      for (const char of password) {
        if (char >= 'A' && char <= 'Z') {
          return matches;
        }
      }
      matches.push({ pattern: 'uppercase', token: password, i: 0, j: password.length - 1 });
      return matches;
    }
  },
  feedback(_match) {
    return { warning: 'Include at least one uppercase letter.', suggestions: [] };
  },
  scoring(_match) {
    return -100;
  },
};
