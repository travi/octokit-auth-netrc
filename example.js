// #### Import
// remark-usage-ignore-next
import stubbedFs from 'mock-fs';
import {createNetrcAuth} from './lib/index.cjs';

// remark-usage-ignore-next
stubbedFs({
  [`${process.env.HOME}/.netrc`]: `
machine api.github.com
  login asdflkajsdflkjadlfjalsdkfjalsdfja
`
});

// #### Authenticate

const auth = createNetrcAuth();

(async () => {
  await auth();
})();
