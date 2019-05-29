package todo.steps;

import cucumber.api.java8.En;

public class MyStepdefs implements En {
  // strings have  to be in quotes in the gherkin to use cucumber expressions
  // auto-step creation doesn't seem to work but if you run it, it prints out the missing steps in v4 format and you just paste them in
  
  public MyStepdefs() {
    When("I get a list of all to-dos", () -> {
    });
    Given("I add a new to-do with title {string}", (title) -> {
    });
    Then("the to-do should be in the list with an id, title {string} and a task resolved status as {string}", (title, status) -> {
    });

    Given("I update the status to {string}", (String string) -> {
    });

    Given("I delete to-do with title {string}", (String string) -> {
    });

    When("I get a list of to-dos", () -> {
    });

    Then("the list should only have a to-do with title {string}", (String string) -> {
    });
  }

}
