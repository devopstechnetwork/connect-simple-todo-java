package todo.backend.resources;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import todo.api.TodoService;
import todo.model.Todo;

import javax.inject.Singleton;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Singleton
public class TodoResource implements TodoService {
  private static final Logger log = LoggerFactory.getLogger(TodoResource.class);
	Map<String, Todo> todos = new ConcurrentHashMap<String, Todo>();

  public TodoResource() {
    log.info("created");
  }

  public List<Todo> addTodo(Todo body) {
    body.id(UUID.randomUUID().toString());

    todos.put(body.getId(), body);

    return new ArrayList<Todo>(todos.values());
  }

  public List<Todo> listTodos() {
    return new ArrayList<Todo>(todos.values());
  }

  public List<Todo> removeTodo(String id) {
    todos.remove(id);
    return new ArrayList<Todo>(todos.values());
  }

  public List<Todo> resolveTodo(String id) {
    Todo todo = todos.get(id);
    if (todo != null) {
      todo.resolved(true);
    }
    return new ArrayList<Todo>(todos.values());
  }
}
