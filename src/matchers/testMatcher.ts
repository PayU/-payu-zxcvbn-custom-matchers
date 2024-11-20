import { Matcher, Match, MatchEstimated, MatchExtended } from '@zxcvbn-ts/core/dist/types';

export const testMatcher: Matcher = {
  Matching: class MatchFirst {
    match({ password }: { password: string }) {
      const matches: Match[] = [];
      if (password.includes('123')) {
        matches.push({
          pattern: 'firstMatcher',
          token: password,
          i: 0,
          j: password.length - 1,
        });
      }
      return matches;
    }
  },
  feedback(_match: MatchEstimated, _isSoleMatch: boolean) {
    return {
      warning: 'Your password should not contain sequences like "123".',
      suggestions: ['Avoid common patterns like numbers in sequence.'],
    };
  },
  scoring(_match: MatchExtended) {
    return -50;
  },
};
