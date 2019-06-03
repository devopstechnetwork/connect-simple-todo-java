package toggle.service;

import cd.connect.features.FeatureService;
import org.glassfish.jersey.client.ClientProperties;
import org.glassfish.jersey.client.proxy.WebResourceFactory;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;

public class FeatureToggleservice {
  private Client client = ClientBuilder.newClient().property(ClientProperties.SUPPRESS_HTTP_COMPLIANCE_VALIDATION, true);
  private WebTarget webTarget = client.target("http://localhost:8553");

  public FeatureService getFeatureToggleService() {
    return WebResourceFactory.newResource(FeatureService.class, webTarget);
  }
}
