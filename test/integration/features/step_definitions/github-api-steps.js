import fetchMock from 'fetch-mock';
import {StatusCodes} from 'http-status-codes';
import {After, Given, Then} from '@cucumber/cucumber';
import any from '@travi/any';
import {assert} from 'chai';

const user = any.simpleObject();

After(() => {
  fetchMock.reset();
});

Given('a personal access token is defined for {string}', async function (domain) {
  this.personalAccessToken = any.word();

  fetchMock
    .getOnce(
      `https://${domain}/user`,
      {status: StatusCodes.OK, body: user},
      {headers: {Authorization: `token ${this.personalAccessToken}`}}
    );
});

Then('the user is returned', async function () {
  assert.deepEqual(this.result.data, user);
});
