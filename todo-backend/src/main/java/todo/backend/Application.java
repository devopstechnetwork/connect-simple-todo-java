package todo.backend;

import cd.connect.jersey.common.CommonConfiguration;
import cd.connect.jersey.common.InfrastructureConfiguration;
import cd.connect.jersey.common.LoggingConfiguration;
import cd.connect.jersey.common.TracingConfiguration;
import cd.connect.lifecycle.ApplicationLifecycleManager;
import cd.connect.lifecycle.LifecycleStatus;
import io.opentracing.contrib.jaxrs2.client.ClientTracingFeature;
import io.prometheus.client.hotspot.DefaultExports;
import org.glassfish.grizzly.http.server.HttpServer;
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.server.ResourceConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import todo.backend.resources.TodoResource;

import java.net.URI;
import java.util.concurrent.TimeUnit;

public class Application {
	private static final Logger log = LoggerFactory.getLogger(Application.class);
	
	public static void main(String[] args) throws InterruptedException {

		URI BASE_URI = URI.create(String.format("http://localhost:%s/",
			System.getProperty("server.port", "8099")));

		log.info("starting on port {}", BASE_URI.toASCIIString());

		// turn on all jvm prometheus metrics
    DefaultExports.initialize();

    FeatureInitializer.initialize();

    // register our resources, try and tag them as singleton as they are instantiated faster
		ResourceConfig config = new ResourceConfig(
      TodoResource.class,
      ClientTracingFeature.class,
      CommonConfiguration.class,
      LoggingConfiguration.class,
      TracingConfiguration.class,
      InfrastructureConfiguration.class);

    final HttpServer server = GrizzlyHttpServerFactory.createHttpServer(BASE_URI, config, true);

    ApplicationLifecycleManager.registerListener(trans -> {
      if (trans.next == LifecycleStatus.TERMINATING) {
        server.shutdown(10, TimeUnit.SECONDS);
      }
    });

		log.info("Application started. (HTTP/2 enabled!) -> {}", BASE_URI);

		// tell the App we are ready
    ApplicationLifecycleManager.updateStatus(LifecycleStatus.STARTED);

    Thread.currentThread().join();
	}


}
