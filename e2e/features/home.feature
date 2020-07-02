Feature: Home Page
  Scenario: Unauthorized user on the home page
    Given the application
    Then home page is opened
    Then display a table with a User column containing the user’s full name and company name
    Then display a table with a Post column containing the post title and post body
    Then show 10 rows per page
    Then a set of left/right arrows (buttons) for paging is visible
    Then Log In button sends the user to the Log In page
  Scenario: Pagination test
    Given the application
    Then home page is opened
    Then clicking on the company name in the User column goes to the company web site
    Then clicking on the right arrow displays the next 10 posts
    Then clicking on the left arrow displays the previous 10 posts
  Scenario: Authorized user in home page
    Given on the login page
    Then the valid user name is entered
    Then press the Log In button
    Then home page is opened
    Then show a “Welcome” message with the user's full name
    Then Log Out button, which is visible
    Then New Post and Log Out buttons are shown
    Then a "New Post" button is visible
    Then clicking on post title navigates to Post Edit page in edit state
    Then New Post button navigates to Post Edit page in empty state
    Then Log Out button kills user session and refreshes Home page
  Scenario: Storing user credentials
    Given on the login page
    Then the valid user name is entered
    Then press the Log In button
    When restarting the app
    Then keep the user logged in
