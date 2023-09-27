// #### Import
// remark-usage-ignore-next
import stubbedFs from 'mock-fs';
import {createNetrcAuth} from './lib/index.cjs';

// remark-usage-ignore-next 8
stubbedFs({
  [`${process.env.HOME}/.netrc`]: `
machine api.github.com
  login asdflkajsdflkjadlfjalsdkfjalsdfja
machine github.acme-inc.com
  login ajfdslajfkdslajfldajklfdsjaklfdsa
`
});

// #### Authenticate

/* defaults to api.github.com */
const auth = createNetrcAuth();

/* For use with GHES, override the default domain */
const enterpriseAuth = createNetrcAuth({domain: 'github.acme-inc.com'});

(async () => {
  await auth();
  await enterpriseAuth();
})();
