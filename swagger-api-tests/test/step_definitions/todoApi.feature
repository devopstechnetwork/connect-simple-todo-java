Feature: Simple todo app
  As simple todo app service
  I want to be able to add, resolve and delete tasks

  Scenario Outline: Add a new task
    Given I call to-do api
    And I delete all the existing tasks
    When I add a new task
    Then I should see response with id and <resolvedStatus> as:

    Examples:
      | resolvedStatus |
      | false          |

  Scenario Outline: Resolve a newly added task
    Given I call to-do api
    And I delete all the existing tasks
    And I add a new task
    When I call resolve todo api
    And I call to-do api
    Then I should see response with id and <resolvedStatus> as:

    Examples:
      | resolvedStatus |
      | true           |


  Scenario: Delete a resolved task
    Given I call to-do api
    And I delete all the existing tasks
    And I add a new task
    And I call resolve todo api
    When I delete all the existing tasks
    Then I should see the response as:
