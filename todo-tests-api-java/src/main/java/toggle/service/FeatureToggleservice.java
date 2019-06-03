package toggle.service;

import cd.connect.features.FeatureService;
import cd.connect.jersey.common.CommonConfiguration;
import cd.connect.jersey.common.LoggingConfiguration;
import org.glassfish.jersey.client.ClientProperties;
import org.glassfish.jersey.client.proxy.WebResourceFactory;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;

public class FeatureToggleservice {

  private Client client = ClientBuilder.newClient()
    .property(ClientProperties.SUPPRESS_HTTP_COMPLIANCE_VALIDATION, true)
    .register(CommonConfiguration.class)
    .register(LoggingConfiguration.class);

  private WebTarget webTarget = client.target("http://localhost:8553");

  public FeatureService getFeatureToggleService() {
    return WebResourceFactory.newResource(FeatureService.class, webTarget);
  }
}
