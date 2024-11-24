import { Matcher, Match } from '@zxcvbn-ts/core/dist/types';

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
  feedback(_match) {
    return { warning: `Password must be at least ${minLength} characters long.`, suggestions: [] };
  },
  scoring(_match) {
    return -100;
  },
});
