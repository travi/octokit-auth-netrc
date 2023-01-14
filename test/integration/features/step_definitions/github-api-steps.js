import nock from 'nock';
import {StatusCodes} from 'http-status-codes';
import {After, Before, Given, Then} from '@cucumber/cucumber';
import any from '@travi/any';
import {assert} from 'chai';

let githubScope;
const user = any.simpleObject();

Before(function () {
  nock.disableNetConnect();

  githubScope = nock('https://api.github.com/');
});

After(() => {
  nock.enableNetConnect();
  nock.cleanAll();

  assert.isTrue(githubScope.isDone());
});

Given('a personal access token is defined for {string}', async function (domain) {
  this.personalAccessToken = any.word();
  githubScope = nock(`https://${domain}/`);

  githubScope
    .matchHeader('Authorization', `token ${this.personalAccessToken}`)
    .get('/user')
    .reply(StatusCodes.OK, user);
});

Then('the user is returned', async function () {
  assert.deepEqual(this.result.data, user);
});
