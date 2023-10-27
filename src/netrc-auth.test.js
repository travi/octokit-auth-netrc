import {createTokenAuth} from '@octokit/auth-token';
import netrc from 'netrc';

import {afterEach, describe, it, expect, vi} from 'vitest';
import any from '@travi/any';
import {when} from 'jest-when';

import createNetrcAuth from './netrc-auth.js';

vi.mock('netrc');
vi.mock('@octokit/auth-token');

describe('createNetrcAuth auth', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const testAuth = (createAuth, {domain = 'api.github.com'} = {}) => {
    const token = any.string();
    const createTokenAuthResult = any.simpleObject();
    netrc.mockReturnValue({...any.simpleObject(), [domain]: {login: token}});
    when(createTokenAuth).calledWith(token).mockReturnValue(createTokenAuthResult);

    expect(createAuth()).toEqual(createTokenAuthResult);
  };

  const testError = (createAuth, {domain = 'api.github.com'} = {}) => {
    netrc.mockReturnValue(any.simpleObject());

    try {
      createAuth();

      throw new Error('an error should have been thrown');
    } catch (e) {
      expect(e.message).toEqual(`No entry was found for \`${domain}\` in your \`~/.netrc\` file`);
      expect(e.code).toEqual('ENONETRCTOKEN');
    }
  };

  it('should read the token from ~/.netrc for api.github.com by default and pass it to the token auth plugin', () => {
    testAuth(() => createNetrcAuth());
  });

  it('should read the token from ~/.netrc for custom domain and passed to the token auth plugin', () => {
    const domain = 'github.acme-inc.com';
    const createAuth = () => createNetrcAuth({domain});

    testAuth(createAuth, {domain});
  });

  it('should throw an error if no netrc entry is found for api.github.com by default', () => {
    testError(() => createNetrcAuth());
  });

  it('should throw an error if no netrc entry is found for custom domain', () => {
    const domain = 'github.acme-inc.com';
    const createAuth = () => createNetrcAuth({domain});

    testError(createAuth, {domain});
  });
});
