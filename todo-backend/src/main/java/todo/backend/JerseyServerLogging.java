package todo.backend;

import cd.connect.spring.jersey.log.JerseyFiltering;
import org.glassfish.jersey.logging.FilteringServerLoggingFilter;
import org.glassfish.jersey.logging.LoggingFeature;

import javax.ws.rs.core.Configurable;

public class JerseyServerLogging extends FilteringServerLoggingFilter {
	public JerseyServerLogging() {
		super(new JerseyFiltering() {
			@Override
			public boolean excludePayloadForUri(String uriPath) {
				return false;
			}

			@Override
			public boolean excludeForUri(String uriPath) {
				return false;
			}

			@Override
			public void registerFilters(Configurable<?> resourceConfig) {
			}
		}, LoggingFeature.Verbosity.PAYLOAD_ANY, 8092);
	}
}
