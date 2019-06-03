Feature: Todo API with feature toggles checks
  As a user of Simple to-do app
  I want to be able to get to-dos with titles in lower case and upper case depending on the feature toggle status


  Scenario Outline: Add a new to-do task (GET and POST Todo) - toggle off
    Given I add a new to-do with title <title>
    When I get a list of all to-dos
    Then the to-do should be in the list with an id, title <expected_title> and a task resolved status as <resolve_status>

    Examples:
      | resolve_status | title    | expected_title |
      | false          | Buy Milk | Buy Milk       |

  @FEATURE_TITLE_TO_UPPERCASE
  Scenario Outline: Add a new to-do task (GET and POST Todo) - toggle on
    Given i add a new to-do with title "<title>" and resolved status "<resolve_status>"
    When I get a list of all to-dos
    Then the to-do should be in the list with an id, title "<expected_title>" and a task resolved status as "<resolve_status>"

    Examples:
      | resolve_status | title    | expected_title |
      | false          | Buy Milk | BUY MILK       |

