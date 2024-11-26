# @zxcvbn-custom-matchers

The package is adding custom matchers to the zxcvbn-ts package. The matchers enforce specific character requirements in passwords and provide feedback and scoring.

## Installation
```sh
npm install zxcvbn-custom-matchers
```

### Usage
```ts
import { zxcvbnOptions } from '@zxcvbn-ts/core';
import {
    lowercaseMatcher,
    numberMatcher,
    specialMatcher,
    uppercaseMatcher,
    minLengthMatcher
} from 'zxcvbn-custom-matchers';

// Add the matchers' translations
const options = {
    translations: merge({}, zxcvbnEnPackage.translations, customMatchersTranslations)
};
zxcvbnOptions.setOptions(options);

// Add the matchers
zxcvbnOptions.addMatcher('lowercaseRequired', lowercaseMatcher);
zxcvbnOptions.addMatcher('minLength', numberMatcher);
zxcvbnOptions.addMatcher('numberRequired', specialMatcher);
zxcvbnOptions.addMatcher('specialRequired', uppercaseMatcher);
zxcvbnOptions.addMatcher('uppercaseRequired', minLengthMatcher(10));

// Use zxcvbn as usual
import { zxcvbn } from '@zxcvbn-ts/core';
const result = zxcvbn('password123');
console.log(result);
```

>Note: When adding a custom matcher with addMatcher, the first parameter (a string) should be the same as the matcher's pattern.

## Matchers Description

This project includes several matchers that enforce specific character requirements in passwords. Each matcher checks for a particular type of character and provides feedback and scoring.

### Uppercase Matcher

- **Pattern**: `uppercase`
- **Purpose**: Ensures the password contains at least one uppercase letter.
- **Feedback**: Suggests including at least one uppercase letter if missing.
- **Scoring**: Returns a score of `1` if missing uppercase letters.

### Lowercase Matcher

- **Pattern**: `lowercase`
- **Purpose**: Ensures the password contains at least one lowercase letter.
- **Feedback**: Suggests including at least one lowercase letter if missing.
- **Scoring**: Returns a score of `1` if missing lowercase letters.

### Number Matcher

- **Pattern**: `number`
- **Purpose**: Ensures the password contains at least one number.
- **Feedback**: Suggests including at least one number if missing.
- **Scoring**: Returns a score of `1` if missing numbers.

### Special Character Matcher

- **Pattern**: `special`
- **Purpose**: Ensures the password contains at least one special character (e.g., !, @, #, $, etc.).
- **Feedback**: Suggests including at least one special character if missing.
- **Scoring**: Returns a score of `1` if missing special characters.

### Minimum Length Matcher

- **Pattern**: `minLength`
- **Purpose**: Ensures the password meets the minimum length requirement.
- **Feedback**: Suggests the password must be at least the specified length if shorter.
- **Scoring**: Returns a score of `1` if the password is shorter than the specified length.
