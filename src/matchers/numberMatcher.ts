import { Matcher, Match } from '@zxcvbn-ts/core/dist/types';

export const numberMatcher: Matcher = {
  Matching: class NumberMatcher {
    match({ password }: { password: string }): Match[] {
      for (const char of password) {
        if (char >= '0' && char <= '9') {
          return [];
        }
      }
      return [{ pattern: 'number', token: password, i: 0, j: password.length - 1 }];
    }
  },
  feedback(_match) {
    return { warning: 'Include at least one number.', suggestions: [] };
  },
  scoring(_match) {
    return -100;
  },
};
