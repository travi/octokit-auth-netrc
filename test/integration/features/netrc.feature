Feature: .netrc

  Scenario: no ~/.netrc file
    Given no netrc file exists
    When the user account is requested
    Then a missing-token error is thrown

  Scenario: no entry for 'api.github.com' in the ~/.netrc file
    Given the netrc file exists
    When the user account is requested
    Then a missing-token error is thrown

  Scenario: personal access token for 'api.github.com' in the ~/.netrc file
    Given the netrc file exists
    And a personal access token is defined for 'api.github.com'
    When the user account is requested
    Then the user is returned

  Scenario: no entry for 'github.acme-inc.com' in the ~/.netrc file
    Given the netrc file exists
    When the user account is requested for 'github.acme-inc.com'
    Then a missing-token error is thrown

  Scenario: personal access token for 'github.acme-inc.com' in the ~/.netrc file
    Given the netrc file exists
    And a personal access token is defined for 'github.acme-inc.com'
    When the user account is requested for 'github.acme-inc.com'
    Then the user is returned
