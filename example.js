// remark-usage-ignore-next
/* eslint-disable-next-line no-unused-vars */
import {createNetrcAuth} from './lib/index.cjs';

const auth = createNetrcAuth();

(async () => {
  await auth();
})();
