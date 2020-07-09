import * as octokitAuthToken from '@octokit/auth-token';
import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';
import * as netrc from '../thirdparty-wrappers/netrc';
import createNetrcAuth from './netrc-auth';

suite('createNetrcAuth auth', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(netrc, 'default');
    sandbox.stub(octokitAuthToken, 'createTokenAuth');
  });

  teardown(() => sandbox.restore());

  test('that the token is read from ~/.netrc and passed to the token auth plugin', async () => {
    const token = any.string();
    const createTokenAuthResult = any.simpleObject();
    netrc.default.returns({...any.simpleObject(), 'api.github.com': {login: token}});
    octokitAuthToken.createTokenAuth.withArgs(token).returns(createTokenAuthResult);

    assert.deepEqual(createNetrcAuth(), createTokenAuthResult);
  });

  test('that an error is thrown if no netrc entry for api.github.com is found', () => {
    netrc.default.returns(any.simpleObject());

    try {
      createNetrcAuth();

      throw new Error('an error should have been thrown');
    } catch (e) {
      assert.equal(e.message, 'No entry was found for `api.github.com` in your `~/.netrc` file');
      assert.equal(e.code, 'ENONETRCTOKEN');
    }
  });
});
