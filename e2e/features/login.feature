Feature: Log In
  Scenario: All fields are present
    Given the login page
    Then page contains username field
    Then Log In button should be disabled
  Scenario: Log In attempt with invalid credentials
    Given the login page
    Then page contains username field
    Then the Invalid Bret username is entered
    Then Log In button should be enabled
    Then press the Log In button
    Then an error message should be displayed
  Scenario: Log In attempt with a valid credentials
    Given the login page
    Then page contains username field
    Then the Bret username is entered
    Then press the Log In button
    Then home page is opened
