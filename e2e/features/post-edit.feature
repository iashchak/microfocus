Feature: Post Edit

  Scenario: All fields are present
    When the user is logged in
    And click to edit post ""
    Then the Title field is present
    Then the Message field is present
    Then the Delete button is present
    Then the Save button is present
    Then the Cancel button is present
    Then the “Go back to Home page” link is present

  Scenario: Incorrent fields
    When the user is logged in
    And click to edit post ""
    Then Fill the title field with 201 characters
    Then Fill the message field with 2001 characters
    Then the title validation error should appear below the field that is in error
    Then the message validation error should appear below the field that is in error
    Then Save and Cancel buttons should be disabled

  Scenario: Correct fields
    When the user is logged in
    Then click to edit post ""
    Then fill the title field with 199 characters
    Then fill the message field with 1999 characters
    Then Save and Cancel buttons should be enabled

  Scenario: Leaving the post editing
    When the user is logged in
    And click to edit post ""
    And fill the title field with 199 characters
    And fill the message field with 1990 characters
    And clicking on “Go back to home page”
    Then display a confirmation dialog and allow the user to remain on the page

  Scenario: Deleting the post
    When the user is logged in
    And click to edit post ""
    And fill the title field with 199 characters
    And fill the message field with 1990 characters
    And click on the "delete"
    Then show a confirmation window, e.g. “Are you sure you want to delete this post?”

  Scenario: Update the post
    When the user is logged in
    And click to edit post ""
    And fill the title field with 199 characters
    And fill the message field with 1990 characters
    And clicking on “Save"
    And the user should be sent back to the Home page
    And  the message indicating that the post was saved is displayed
