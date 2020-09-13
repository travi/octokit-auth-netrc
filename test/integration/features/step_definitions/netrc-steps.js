import {Octokit} from '@octokit/core';
// eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
import {createNetrcAuth} from 'octokit-auth-netrc';
import {After, Given, Then, When} from 'cucumber';
import stubbedFs from 'mock-fs';
import {assert} from 'chai';

let netrcExists;
const debug = require('debug')('test');

After(function () {
  stubbedFs.restore();

  netrcExists = null;
});

Given('no netrc file exists', async function () {
  netrcExists = false;
});

Given('the netrc file exists', async function () {
  netrcExists = true;
});

When('the user account is requested', async function () {
  stubbedFs({
    ...netrcExists && {
      [`${process.env.HOME}/.netrc`]: this.personalAccessToken
        ? `
machine api.github.com
  login ${(this.personalAccessToken)}
`
        : ''
    }
  });
  const OctokitWithNetrcAuth = Octokit.defaults({authStrategy: createNetrcAuth});

  try {
    const octokit = new OctokitWithNetrcAuth();

    this.result = await octokit.request('GET /user');
  } catch (e) {
    debug(e);
    this.result = e;
  }
});

Then('a missing-token error is thrown', async function () {
  assert.equal(this.result.code, 'ENONETRCTOKEN');
  assert.equal(this.result.message, 'No entry was found for `api.github.com` in your `~/.netrc` file');
});
