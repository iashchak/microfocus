Feature: Post Edit

  Scenario: All fields are present
    Given the login page
    Then fill the field #userName with value Bret
    Then press the #login button
    Then click on title of the post #1
    Then page contains #title field
    Then page contains #message field
    Then page contains #delete button
    Then page contains #save button
    Then page contains #cancel button
    Then page contains #header-link-to-home button

  Scenario: Incorrent fields
    Given the login page
    Then fill the field #userName with value Bret
    Then press the #login button
    Then click on title of the post #1
    Then fill the field #title with 201 characters
    Then fill the field #message with 2001 characters
    Then a message #title-error should be displayed
    Then a message #message-error should be displayed
    Then button #save should be disabled
    Then button #cancel should be disabled

  Scenario: Correct fields
    Given the login page
    Then fill the field #userName with value Bret
    Then press the #login button
    Then click on title of the post #1
    Then fill the field #title with 1 characters
    Then fill the field #message with 1 characters
    Then button #save should be enabled
    Then button #cancel should be enabled

  Scenario: Leaving the post editing
    Given the login page
    Then fill the field #userName with value Bret
    Then press the #login button
    Then click on title of the post #1
    Then fill the field #title with 1 characters
    Then fill the field #message with 1 characters
    Then button #save should be enabled
    Then button #cancel should be enabled

  Scenario: Deleting the post
    Given the login page
    Then fill the field #userName with value Bret
    Then press the #login button
    Then click on title of the post #1
    Then fill the field #title with 1 characters
    Then fill the field #message with 1 characters
    Then button #save should be enabled
    Then button #cancel should be enabled
    Then button #delete should be enabled
    Then press the #delete button
    Then answer "cancel" for alert
    Then page contains #delete button
    Then button #delete should be enabled
    Then press the #delete button
    Then answer "apply" for alert
    Then home page is opened
    Then a message #message-1 should be displayed
    Then press the #delete-message-1 button
    Then 1 row and 1 column contains the user name - Leanne Graham and the company name - Romaguera-Crona
    Then 1 row and 2 column contains the title - qui est esse and the content - est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla

  Scenario: Update the post
    Given the login page
    Then fill the field #userName with value Bret
    Then press the #login button
    Then click on title of the post #1
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
