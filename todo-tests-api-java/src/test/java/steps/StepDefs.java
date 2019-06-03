package steps;

import cucumber.api.java.After;
import cucumber.api.java.Before;
import cucumber.api.java.en.And;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import todo.Features;
import todo.model.Todo;
import todo.service.TodoAPIService;
import toggle.service.FeatureToggleservice;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class StepDefs {

  private TodoAPIService todoAPIService;
  private List<Todo> todoList;

  private FeatureToggleservice featureToggleService;

  public StepDefs(TodoAPIService todoAPIService, FeatureToggleservice featureToggleService) {
    this.todoAPIService = todoAPIService;
    this.featureToggleService = featureToggleService;
  }

  @Given("i add a new to-do with title {string} and resolved status {string}")
  public void addTodo(String title, String resolvedStatus) {
    Todo todoBody = new Todo();
    todoBody.setTitle(title);
    todoBody.setResolved(Boolean.parseBoolean(resolvedStatus));
    todoList = todoAPIService.getTodoApi().addTodo(todoBody);
  }

  @When("I get a list of all to-dos")
  public void iGetAListOfAllToDos() {
    todoList = todoAPIService.getTodoApi().listTodos();
  }

  @Then("the to-do should be in the list with an id, title {string} and a task resolved status as {string}")
  public void theToDoShouldBeInTheList(String title, String resolveStatus) {
    Todo matchedTodo = todoList.stream().filter(td -> td.getTitle().equals(title)).findFirst().orElse(null);
    assertThat(matchedTodo).withFailMessage("To-do with title {} is not present", title).isNotNull();
    assertThat(matchedTodo.getTitle()).isEqualTo(title);
    assertThat(matchedTodo.isResolved()).isEqualTo(Boolean.parseBoolean(resolveStatus));
  }

  @And("I update the status to {string}")
  public void updateResolvedStatus(String resolvedStatus) {
    String id = todoList.get(0).getId();
    todoAPIService.getTodoApi().resolveTodo(id);
  }

  @Given("I delete all the to-dos")
  public void deleteAllTheToDos() {
    iGetAListOfAllToDos();
    if (todoList != null) {
      todoList.forEach(td -> todoAPIService.getTodoApi().removeTodo(td.getId()));
    }
  }

  @And("I delete to-do with title {string}")
  public void deleteToDo(String title) {
    Todo findByTitle = todoList.stream().filter(td -> td.getTitle().equals(title)).findFirst().get();
    todoAPIService.getTodoApi().removeTodo(findByTitle.getId());
  }

  @Then("the list should only have a to-do with title {string}")
  public void shouldOnlyHaveAToDo(String title) {
    assertThat(todoList).hasSize(1);
    Todo matchedTodo = todoList.stream().filter(td -> td.getTitle().equals(title)).findFirst().orElse(null);
    assertThat(matchedTodo).withFailMessage("To-do with title {} is not present", title).isNotNull();
  }

  /***Feature toggle service hooks***/

  @Before("@FEATURE_TITLE_TO_UPPERCASE")
  public void enableFeature() {
    featureToggleService.getFeatureToggleService().unlockFeature(Features.FEATURE_TITLE_TO_UPPERCASE.toString());
    featureToggleService.getFeatureToggleService().enableFeature(Features.FEATURE_TITLE_TO_UPPERCASE.toString());

  }

  @After("@FEATURE_TITLE_TO_UPPERCASE")
  public void disableFeature() {
    featureToggleService.getFeatureToggleService().disableFeature(Features.FEATURE_TITLE_TO_UPPERCASE.toString());
    featureToggleService.getFeatureToggleService().lockFeature(Features.FEATURE_TITLE_TO_UPPERCASE.toString());
  }
}


