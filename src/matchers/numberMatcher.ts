import { Matcher, Match } from '@zxcvbn-ts/core/dist/types';

export const numberMatcher: Matcher = {
  Matching: class NumberMatcher {
    match({ password }: { password: string }): Match[] {
      const matches: Match[] = [];
      let hasNumber = false;
      for (const char of password) {
        if (char >= '0' && char <= '9') {
          hasNumber = true;
          break;
        }
      }
      if (!hasNumber) {
        matches.push({ pattern: 'number', token: password, i: 0, j: password.length - 1 });
      }
      return matches;
    }
  },
  feedback(_match) {
    return { warning: 'Include at least one number.', suggestions: [] };
  },
  scoring(_match) {
    return -100;
  },
};
