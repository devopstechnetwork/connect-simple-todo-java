package todo.backend;

import cd.connect.features.client.BaseRestRepository;
import cd.connect.features.client.FeatureContext;
import cd.connect.jersey.common.CommonConfiguration;
import cd.connect.jersey.common.LoggingConfiguration;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;

/**
 *
 */
public class FeatureInitializer {

  public enum FakeFeature {
    FEATURE_X, FEATURE_Y
  }

  public static void initialize() {
    Client client = ClientBuilder.newBuilder()
      .register(CommonConfiguration.class)
      .register(LoggingConfiguration.class)
      .build();

    FeatureContext.repository = new BaseRestRepository(client, System.getProperty("feature-service.url"));
    FeatureContext.repository.ensureFeaturesExist(FakeFeature.class);
  }
}
