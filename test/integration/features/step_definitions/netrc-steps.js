// eslint-disable-next-line import/no-unresolved
import {Octokit} from '@octokit/core';
// eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
import {createNetrcAuth} from 'octokit-auth-netrc';
import {After, Given, Then, When} from '@cucumber/cucumber';
import stubbedFs from 'mock-fs';
import {assert} from 'chai';

import testDebug from 'debug';

let netrcExists;
let ghDomain = 'api.github.com';
const debug = testDebug('test');

After(function () {
  stubbedFs.restore();

  netrcExists = null;
  ghDomain = 'api.github.com';
});

Given('no netrc file exists', async function () {
  netrcExists = false;
});

Given('the netrc file exists', async function () {
  netrcExists = true;
});

const setupNetrcEntry = async context => {
  stubbedFs({
    ...netrcExists && {
      [`${process.env.HOME}/.netrc`]: context.personalAccessToken
        ? `
machine ${ghDomain}
  login ${(context.personalAccessToken)}
`
        : ''
    }
  });

  const isGHES = 'api.github.com' !== ghDomain;
  const authStrategy = isGHES ? () => createNetrcAuth({domain: ghDomain}) : createNetrcAuth;
  const OctokitWithNetrcAuth = Octokit.defaults({
    authStrategy,
    baseUrl: isGHES ? `https://${ghDomain}` : null
  });

  try {
    const octokit = new OctokitWithNetrcAuth();

    context.result = await octokit.request('GET /user');
  } catch (e) {
    debug(e);
    context.result = e;
  }
};
When('the user account is requested', async function () {
  await setupNetrcEntry(this);
});

When('the user account is requested for {string}', async function (domain) {
  ghDomain = domain;

  await setupNetrcEntry(this);
});

Then('a missing-token error is thrown', async function () {
  assert.equal(this.result.code, 'ENONETRCTOKEN');
  assert.equal(this.result.message, `No entry was found for \`${ghDomain}\` in your \`~/.netrc\` file`);
});
