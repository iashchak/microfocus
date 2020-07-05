Feature: Home Page
  Scenario: Unauthorized user on the home page
    Given the application
    Then home page is opened
    Then 1 row and 1 column contains the user name - Leanne Graham and the company name - Romaguera-Crona
    Then 1 row and 2 column contains the title - sunt aut facere repellat provident occaecati excepturi optio reprehenderit and the content - quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto
