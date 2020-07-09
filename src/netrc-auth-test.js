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

  test('that the auth function is returned', async () => {
    const token = any.string();
    const createTokenAuthResult = any.simpleObject();
    netrc.default.returns({'api.github.com': {login: token}});
    octokitAuthToken.createTokenAuth.withArgs(token).returns(createTokenAuthResult);

    assert.deepEqual(createNetrcAuth(), createTokenAuthResult);
  });
});
