package todo.backend;

import cd.connect.jersey.prometheus.PrometheusDynamicFeature;
import cd.connect.opentracing.LoggingSpanTracer;
import io.jaegertracing.Configuration;
import io.netty.channel.Channel;
import io.opentracing.Tracer;
import io.opentracing.contrib.jaxrs2.client.ClientTracingFeature;
import io.opentracing.contrib.jaxrs2.server.ServerTracingDynamicFeature;
import io.opentracing.util.GlobalTracer;
import io.prometheus.client.hotspot.DefaultExports;
import org.glassfish.hk2.utilities.binding.AbstractBinder;
import org.glassfish.jersey.netty.httpserver.NettyHttpContainerProvider;
import org.glassfish.jersey.server.ResourceConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import todo.backend.resources.JerseyPrometheusResource;
import todo.backend.resources.TodoResource;

import java.net.URI;

public class Application {
	private static final Logger log = LoggerFactory.getLogger(Application.class);
	
	public static void main(String[] args) throws InterruptedException {
		URI BASE_URI = URI.create(String.format("http://localhost:%s/",
			System.getProperty("server.port", "8099")));

		log.info("starting on port {}", BASE_URI.toASCIIString());

		// turn on all jvm prometheus metrics
    DefaultExports.initialize();

    // register the open-tracing tracer
    GlobalTracer.register(new LoggingSpanTracer(getTracer()));

    // register our resources, try and tag them as singleton as they are instantiated faster
		ResourceConfig config = new ResourceConfig(
      TodoResource.class,
      JerseyServerLogging.class,
      ClientTracingFeature.class,
      PrometheusDynamicFeature.class,
      JerseyPrometheusResource.class);

		config.register(new AbstractBinder() {
			@Override
			protected void configure() {
				// this is awkward but required, otherwise it simply doesn't work.
				bind(new ServerTracingDynamicFeature.Builder(GlobalTracer.get()).withJoinExistingActiveSpan(false).build());
			}
		});

		final Channel server = NettyHttpContainerProvider.createHttp2Server(BASE_URI, config, null);

		Runtime.getRuntime().addShutdownHook(new Thread(new Runnable() {
			public void run() {
				server.close();
			}
		}));

		log.info("Application started. (HTTP/2 enabled!) -> {}", BASE_URI);

		Thread.currentThread().join();
	}

	private static Tracer getTracer() {
    return  new io.jaegertracing.Configuration(System.getProperty("app.name", "local-app"))
      // We need to get a builder so that we can directly inject the
      // reporter instance.
      .withReporter(Configuration.ReporterConfiguration.fromEnv())
      .withSampler(Configuration.SamplerConfiguration.fromEnv().withType("const").withParam(1)).getTracer();
  }
}
