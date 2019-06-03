Feature: Todo API
  As a user of Simple to-do app
  I want to be able to get, post, update and delete todos

  Background: Remove all to-dos
    Given I delete all the to-dos

  Scenario Outline: Add a new to-do task (GET and POST Todo)
    Given i add a new to-do with title "<title>" and resolved status "<resolve_status>"
    When I get a list of all to-dos
   Then the to-do should be in the list with an id, title "<title>" and a task resolved status as "<resolve_status>"

    Examples:
     | resolve_status| title    |
     | false         | Buy Milk |

  Scenario Outline: Update a to-do task (PUT Todo)
    Given i add a new to-do with title "<title>" and resolved status "false"
    And I update the status to "<resolve_status>"
    When I get a list of all to-dos
    Then the to-do should be in the list with an id, title "<title>" and a task resolved status as "<resolve_status>"

    Examples:
      | resolve_status | title         |
      | true           | Buy Chocolate |

  Scenario Outline: Delete a to-do task (DELETE Todo)
    Given i add a new to-do with title "<title1>" and resolved status "<resolve_status>"
    Given i add a new to-do with title "<title2>" and resolved status "<resolve_status>"
    And I delete to-do with title "<title1>"
    When I get a list of all to-dos
    Then the list should only have a to-do with title "<title2>"
    Examples:
      | title1  | title2         |resolve_status|
      | Buy Milk | Buy Chocolate | false        |

