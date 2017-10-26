Feature: Simple todo app
  As simple todo app service
  I want to be able to add, resolve and delete tasks

  Scenario Outline: Add a new task
    Given I call to-do api
    And I delete all the existing tasks
    When I add a new task with title <title>
    Then I should see response with id, title <title> and resolved status <resolvedStatus> as:

    Examples:
      | resolvedStatus | title    |
      | false          | Buy Milk |

  Scenario Outline: Resolve a newly added task
    Given I call to-do api
    And I delete all the existing tasks
    And I add a new task with title <title>
    When I call resolve todo api
    And I call to-do api
    Then I should see response with id, title <title> and resolved status <resolvedStatus> as:

    Examples:
      | resolvedStatus | title         |
      | true           | Buy Chocolate |


  Scenario Outline: Delete a resolved task
    Given I call to-do api
    And I delete all the existing tasks
    And I add a new task with title <title>
    And I call resolve todo api
    When I delete all the existing tasks
    Then I should see the response as:

    Examples:
      | title    |
      | Buy Milk |
