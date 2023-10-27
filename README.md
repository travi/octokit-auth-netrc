# octokit-auth-netrc

[.netrc](https://ec.haxx.se/usingcurl/usingcurl-netrc) auth plugin for
[Octokit](https://github.com/octokit/core.js)

<!--status-badges start -->

[![Codecov][coverage-badge]][coverage-link]
[![Node CI Workflow Status][github-actions-ci-badge]][github-actions-ci-link]
[![OpenSSF Scorecard][ossfScorecard-badge]][ossfScorecard-link]

<!--status-badges end -->

## Table of Contents

* [Usage](#usage)
  * [Installation](#installation)
  * [Defining your token](#defining-your-token)
  * [Example](#example)
    * [Import](#import)
    * [Authenticate](#authenticate)
  * [API](#api)
    * [`createNetrcAuth`](#createnetrcauth)
* [Contributing](#contributing)
  * [Dependencies](#dependencies)
  * [Verification](#verification)

## Usage

<!--consumer-badges start -->

[![MIT license][license-badge]][license-link]
[![npm][npm-badge]][npm-link]
[![Try octokit-auth-netrc on RunKit][runkit-badge]][runkit-link]
![node][node-badge]

<!--consumer-badges end -->

### Installation

```sh
$ npm install octokit-auth-netrc --save-prod
```

### Defining your token

Add a [personal access token](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line)
to your [`~/.netrc` file](https://ec.haxx.se/usingcurl-netrc.html)

```
machine api.github.com
  login <personal access token here>

machine github.acme-inc.com
  login <personal access token here>
```

### Example

#### Import

```javascript
import {createNetrcAuth} from './lib/index.cjs';
```

#### Authenticate

```javascript
/*defaults to api.github.com*/
const auth = createNetrcAuth();

/*For use with GHES, override the default domain*/
const enterpriseAuth = createNetrcAuth({ domain: 'github.acme-inc.com' });

(async () => {
  await auth();
  await enterpriseAuth();
})();
```

### API

#### `createNetrcAuth`

Returns an [`auth()` function](https://github.com/octokit/auth-token.js#auth)
after reading your token from the `~/.netrc` file. Throws an error with code
`ENONETRCTOKEN` when an entry for `api.github.com` is not found in the
`~/.netrc` file.

## Contributing

<!--contribution-badges start -->

[![PRs Welcome][PRs-badge]][PRs-link]
[![Conventional Commits][commit-convention-badge]][commit-convention-link]
[![Commitizen friendly][commitizen-badge]][commitizen-link]
[![semantic-release][semantic-release-badge]][semantic-release-link]
[![Renovate][renovate-badge]][renovate-link]

<!--contribution-badges end -->

### Dependencies

```sh
$ nvm install
$ npm install
```

### Verification

```sh
$ NODE_OPTIONS=--no-experimental-fetch npm test
```

[PRs-link]: http://makeapullrequest.com

[PRs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg

[commit-convention-link]: https://conventionalcommits.org

[commit-convention-badge]: https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg

[commitizen-link]: http://commitizen.github.io/cz-cli/

[commitizen-badge]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg

[semantic-release-link]: https://github.com/semantic-release/semantic-release

[semantic-release-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg

[renovate-link]: https://renovatebot.com

[renovate-badge]: https://img.shields.io/badge/renovate-enabled-brightgreen.svg?logo=renovatebot

[coverage-link]: https://codecov.io/github/travi/octokit-auth-netrc

[coverage-badge]: https://img.shields.io/codecov/c/github/travi/octokit-auth-netrc.svg

[license-link]: LICENSE

[license-badge]: https://img.shields.io/github/license/travi/octokit-auth-netrc.svg

[npm-link]: https://www.npmjs.com/package/octokit-auth-netrc

[npm-badge]: https://img.shields.io/npm/v/octokit-auth-netrc.svg

[runkit-link]: https://npm.runkit.com/octokit-auth-netrc

[runkit-badge]: https://badge.runkitcdn.com/octokit-auth-netrc.svg

[github-actions-ci-link]: https://github.com/travi/octokit-auth-netrc/actions?query=workflow%3A%22Node.js+CI%22+branch%3Amaster

[github-actions-ci-badge]: https://github.com/travi/octokit-auth-netrc/workflows/Node.js%20CI/badge.svg

[node-badge]: https://img.shields.io/node/v/octokit-auth-netrc?logo=node.js

[ossfScorecard-link]: https://securityscorecards.dev/viewer/?uri=github.com/travi/octokit-auth-netrc

[ossfScorecard-badge]: https://api.securityscorecards.dev/projects/github.com/travi/octokit-auth-netrc/badge
