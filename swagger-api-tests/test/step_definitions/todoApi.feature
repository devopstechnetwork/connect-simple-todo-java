Feature: Simple todo app
  As simple todo app service
  I want to be able to add, resolve and delete tasks

  Scenario Outline: Add a new to-do task
    Given I get a list of to-dos
    And I delete all the existing to-do tasks
    When I add a new task with title <title>
    Then I should get a response with an id, title <title> and a task resolved status as <taskResolvedStatus>

    Examples:
      | taskResolvedStatus | title    |
      | false              | Buy Milk |

  Scenario Outline: Resolve a newly added to-do task
    Given I get a list of to-dos
    And I delete all the existing to-do tasks
    And I add a new task with title <title>
    When I call resolve to-do api
    And I get a list of to-dos
    Then I should get a response with an id, title <title> and a task resolved status as <taskResolvedStatus>

    Examples:
      | taskResolvedStatus | title         |
      | true               | Buy Chocolate |


  Scenario Outline: Delete a resolved to-do task
    Given I get a list of to-dos
    And I delete all the existing to-do tasks
    And I add a new task with title <title>
    And I call resolve to-do api
    When I delete all the existing to-do tasks
    And I get a list of to-dos
    Then I should see null response

    Examples:
      | title    |
      | Buy Milk |
