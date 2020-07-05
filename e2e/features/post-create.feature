Feature: Post Create

  Scenario: All fields are present
    Given the login page
    Then fill the field #userName with value Bret
    Then press the #login button
    And press the #header-link-to-create-post button
    Then page contains #title field
    Then page contains #message field
    Then page contains #save button
    Then page contains #cancel button
    Then page contains #header-link-to-home button

  Scenario: Incorrent fields
    Given the login page
    Then fill the field #userName with value Bret
    Then press the #login button
    And press the #header-link-to-create-post button
    Then fill the field #title with 201 characters
    Then fill the field #message with 2001 characters
    Then a message #title-error should be displayed
    Then a message #message-error should be displayed
    Then button #cancel should be disabled
    Then button #save should be disabled

  Scenario: Correct fields
    Given the login page
    Then fill the field #userName with value Bret
    Then press the #login button
    And press the #header-link-to-create-post button
    Then fill the field #title with 1 characters
    Then fill the field #message with 1 characters
    Then button #save should be enabled
    Then button #cancel should be enabled

  Scenario: Saving the post editing
    Given the login page
    Then fill the field #userName with value Bret
    Then press the #login button
    And press the #header-link-to-create-post button
    Then fill the field #title with 1 characters
    Then fill the field #message with 1 characters
    Then button #save should be enabled
    Then button #cancel should be enabled
    Then press the #save button
    And home page is opened
    Then 1 row and 1 column contains the user name - Leanne Graham and the company name - Romaguera-Crona
    Then 1 row and 2 column contains the title - # and the content - #
    Then a message #message-1 should be displayed
    Then press the #delete-message-1 button
