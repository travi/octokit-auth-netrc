import * as octokitAuthToken from '@octokit/auth-token';
import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';
import * as netrc from '../thirdparty-wrappers/netrc.js';
import createNetrcAuth from './netrc-auth.js';

suite('createNetrcAuth auth', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(netrc, 'default');
    sandbox.stub(octokitAuthToken, 'createTokenAuth');
  });

  teardown(() => sandbox.restore());

  const testAuth = (createAuth, {domain = 'api.github.com'} = {}) => {
    const token = any.string();
    const createTokenAuthResult = any.simpleObject();
    netrc.default.returns({...any.simpleObject(), [domain]: {login: token}});
    octokitAuthToken.createTokenAuth.withArgs(token).returns(createTokenAuthResult);

    assert.deepEqual(createAuth(), createTokenAuthResult);
  };

  test('that the token is read from ~/.netrc for api.github.com by default and passed to the token auth plugin', () => {
    testAuth(() => createNetrcAuth());
  });

  test('that the token is read from ~/.netrc for custom domain and passed to the token auth plugin', () => {
    const domain = 'github.acme-inc.com';
    const createAuth = () => createNetrcAuth({domain});

    testAuth(createAuth, {domain});
  });

  const testError = (createAuth, {domain = 'api.github.com'} = {}) => {
    netrc.default.returns(any.simpleObject());

    try {
      createAuth();

      throw new Error('an error should have been thrown');
    } catch (e) {
      assert.equal(e.message, `No entry was found for \`${domain}\` in your \`~/.netrc\` file`);
      assert.equal(e.code, 'ENONETRCTOKEN');
    }
  };

  test('that an error is thrown if no netrc entry is found for api.github.com by default', () => {
    testError(() => createNetrcAuth());
  });

  test('that an error is thrown if no netrc entry is found for custom domain', () => {
    const domain = 'github.acme-inc.com';
    const createAuth = () => createNetrcAuth({domain});

    testError(createAuth, {domain});
  });
});
