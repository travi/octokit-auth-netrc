import {createTokenAuth} from '@octokit/auth-token';
import netrc from '../thirdparty-wrappers/netrc';

export default function () {
  const githubCredentials = netrc()['api.github.com'];

  return createTokenAuth(githubCredentials.login);
}
