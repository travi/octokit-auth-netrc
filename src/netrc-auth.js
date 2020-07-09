import {createTokenAuth} from '@octokit/auth-token';
import netrc from '../thirdparty-wrappers/netrc';

export default function () {
  const githubCredentials = netrc()['api.github.com'];

  if (githubCredentials) return createTokenAuth(githubCredentials.login);

  const error = new Error('No entry was found for `api.github.com` in your `~/.netrc` file');
  error.code = 'ENONETRCTOKEN';
  throw error;
}
