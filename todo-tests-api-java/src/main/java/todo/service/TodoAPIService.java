package todo.service;

import org.glassfish.jersey.client.ClientProperties;
import org.glassfish.jersey.client.proxy.WebResourceFactory;
import todo.api.TodoService;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;

public class TodoAPIService {
  private Client client = ClientBuilder.newClient().property(ClientProperties.SUPPRESS_HTTP_COMPLIANCE_VALIDATION, true);

  private WebTarget webTarget = client.target("http://localhost:8099");

  public TodoService getTodoApi() {
    return WebResourceFactory.newResource(TodoService.class, webTarget);
  }
}
