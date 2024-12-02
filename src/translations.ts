// translations.ts
import { MatcherNames } from './matcherNames';

export const MatchersTranslations = {
  warnings: {
    [MatcherNames.lowercase]: 'At least one lowercase letter is required.',
    [MatcherNames.minLength]: 'Password must be at least %s characters long.',
    [MatcherNames.maxLength]: 'Password must be no more than %s characters long.',
    [MatcherNames.number]: 'At least one number is required.',
    [MatcherNames.specialChar]: 'At least one special character is required.',
    [MatcherNames.uppercase]: 'At least one uppercase letter is required.',
  },
  suggestions: {
    [MatcherNames.lowercase]: 'Include at least one lowercase letter.',
    [MatcherNames.minLength]: 'Make your password at least %s characters long.',
    [MatcherNames.maxLength]: 'Reduce your password to no more than %s characters.',
    [MatcherNames.number]: 'Include at least one number.',
    [MatcherNames.specialChar]: 'Include at least one special character.',
    [MatcherNames.uppercase]: 'Include at least one uppercase letter.',
  },
  timeEstimation: {},
};
