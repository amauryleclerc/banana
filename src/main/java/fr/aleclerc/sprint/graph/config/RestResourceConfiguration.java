package fr.aleclerc.sprint.graph.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;

import fr.aleclerc.sprint.graph.entities.Sprint;
import fr.aleclerc.sprint.graph.entities.Story;
@Configuration
public class RestResourceConfiguration  extends RepositoryRestConfigurerAdapter {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Sprint.class,Story.class);
        config.setBasePath("/api");
    }
}