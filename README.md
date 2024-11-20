# @payu/zxcvbn-custom-matchers

## Installation
```sh
npm install @payu/zxcvbn-custom-matchers
```

### Usage
```ts
import { zxcvbnOptions } from '@zxcvbn-ts/core';
import { firstMatcher, secondMatcher } from '@payu/my-package';

// Add the matchers
zxcvbnOptions.addMatcher('first', firstMatcher);
zxcvbnOptions.addMatcher('second', secondMatcher);

// Use zxcvbn as usual
import { zxcvbn } from '@zxcvbn-ts/core';
const result = zxcvbn('password123');
console.log(result);
```

