import { Matcher, Match } from '@zxcvbn-ts/core/dist/types';

export const characterRequirementsMatcher: Matcher = {
  Matching: class CharacterRequirements {
    match({ password }: { password: string }): Match[] {
      const matches: Match[] = [];
      const hasUppercase = /[A-Z]/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasSpecial = /[^a-zA-Z\d]/.test(password);

      if (!hasUppercase) {
        matches.push({ pattern: 'uppercase', token: password, i: 0, j: password.length - 1 });
      }
      if (!hasLowercase) {
        matches.push({ pattern: 'lowercase', token: password, i: 0, j: password.length - 1 });
      }
      if (!hasNumber) {
        matches.push({ pattern: 'number', token: password, i: 0, j: password.length - 1 });
      }
      if (!hasSpecial) {
        matches.push({ pattern: 'special', token: password, i: 0, j: password.length - 1 });
      }

      return matches;
    }
  },
  feedback(match) {
    const feedbacks: Record<string, string> = {
      uppercase: 'Include at least one uppercase letter.',
      lowercase: 'Include at least one lowercase letter.',
      number: 'Include at least one number.',
      special: 'Include at least one special character.',
    };
    return { warning: feedbacks[match.pattern], suggestions: [] };
  },
  scoring(_match) {
    return -100;
  },
};
