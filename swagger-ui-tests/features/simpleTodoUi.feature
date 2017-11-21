Feature: Simple todo app
  As a simple todo app user
  I want to be able to create, resolve and delete my tasks

  Scenario Outline: Add and delete task(s)
    Given I launch the simple todo app
    When I add a new <task>
    Then I should see a newly added <task> in the simple todo app page
    And I delete the above created task

    Examples:
      | task     |
      | Buy Milk |

  Scenario Outline: Resolve task as done
    Given I launch the simple todo app
    And I add a new <task>
    When I click on done
    Then I should see the text as <doneDeletedText>
    And I delete the above done task

    Examples:
      | task          | doneDeletedText      |
      | Buy Chocolate | Delete Buy Chocolate |

