import {createTokenAuth} from '@octokit/auth-token';
import netrc from 'netrc';

export default function ({domain = 'api.github.com'} = {}) {
  const githubCredentials = netrc()[domain];

  if (githubCredentials) return createTokenAuth(githubCredentials.login);

  const error = new Error(`No entry was found for \`${domain}\` in your \`~/.netrc\` file`);
  error.code = 'ENONETRCTOKEN';
  throw error;
}
