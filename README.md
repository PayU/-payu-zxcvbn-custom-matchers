# @payu/zxcvbn-custom-matchers

The package is adding custom matchers to the zxcvbn-ts package. The matchers enforce specific character requirements in passwords and provide feedback and scoring.

## Installation
```sh
npm install @payu/zxcvbn-custom-matchers
```

### Usage
```ts
import { zxcvbnOptions } from '@zxcvbn-ts/core';
import { 
    lowercaseMatcher,
    numberMatcher,
    specialMatcher,
    uppercaseMatcher
} from '@payu/zxcvbn-custom-matchers';

// Add the matchers
zxcvbnOptions.addMatcher('lowercaseMatcher', lowercaseMatcher);
zxcvbnOptions.addMatcher('numberMatcher', numberMatcher);
zxcvbnOptions.addMatcher('specialMatcher', specialMatcher);
zxcvbnOptions.addMatcher('uppercaseMatcher', uppercaseMatcher);

// Use zxcvbn as usual
import { zxcvbn } from '@zxcvbn-ts/core';
const result = zxcvbn('password123');
console.log(result);
```

## Matchers Description

This project includes several matchers that enforce specific character requirements in passwords. Each matcher checks for a particular type of character and provides feedback and scoring.

### Uppercase Matcher

- **Purpose**: Ensures the password contains at least one uppercase letter.
- **Feedback**: Suggests including at least one uppercase letter if missing.
- **Scoring**: Returns a score of `-100` if missing uppercase letters.

### Lowercase Matcher

- **Purpose**: Ensures the password contains at least one lowercase letter.
- **Feedback**: Suggests including at least one lowercase letter if missing.
- **Scoring**: Returns a score of `-100` if missing lowercase letters.

### Number Matcher

- **Purpose**: Ensures the password contains at least one number.
- **Feedback**: Suggests including at least one number if missing.
- **Scoring**: Returns a score of `-100` if missing numbers.

### Special Character Matcher

- **Purpose**: Ensures the password contains at least one special character (e.g., !, @, #, $, etc.).
- **Feedback**: Suggests including at least one special character if missing.
- **Scoring**: Returns a score of `-100` if missing special characters.
