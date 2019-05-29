Feature: Todo API
  As a user of Simple to-do app
  I want to be able to get, post, update and delete todos

  Scenario Outline: Add a new to-do task
    Given I add a new to-do with title "<title>"
    When I get a list of all to-dos
    Then the to-do should be in the list with an id, title "<title>" and a task resolved status as "<resolve_status>"

    Examples:
     | resolve_status| title    |
     | false              | Buy Milk |

  Scenario Outline: Update a to-do task (PUT Todo)
    Given I add a new to-do with title "<title>"
    And I update the status to "<resolveStatus>"
    When I get a list of all to-dos
    Then the to-do should be in the list with an id, title "<title>" and a task resolved status as "<resolve_status>"

    Examples:
      | resolve_status | title         |
      | true               | Buy Chocolate |

  Scenario Outline: Delete a to-do task (DELETE Todo)
    Given I add a new to-do with title "<title1>"
    Given I add a new to-do with title "<title2>"
    And I delete to-do with title "<title1>"
    When I get a list of to-dos
    Then the list should only have a to-do with title "<title2>"
    Examples:
      | title1  | title2         |
      | Buy Milk | Buy Chocolate |

