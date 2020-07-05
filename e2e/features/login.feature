Feature: Log In
  Scenario: All fields are present
    Given the login page
    Then page contains #userName field
    Then button #login should be disabled
  Scenario: Log In attempt with invalid credentials
    Given the login page
    Then page contains #userName field
    Then fill the field #userName with value Bret1
    Then button #login should be enabled
    Then press the #login button
    Then a message #login-error should be displayed
  Scenario: Log In attempt with a valid credentials
    Given the login page
    Then page contains #userName field
    Then fill the field #userName with value Bret
    Then press the #login button
    Then home page is opened
