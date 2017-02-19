package fr.aleclerc.sprint.graph.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.core.event.ValidatingRepositoryEventListener;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

import fr.aleclerc.sprint.graph.entities.Absence;
import fr.aleclerc.sprint.graph.entities.Member;
import fr.aleclerc.sprint.graph.entities.Project;
import fr.aleclerc.sprint.graph.entities.Sprint;
import fr.aleclerc.sprint.graph.entities.Story;
import fr.aleclerc.sprint.graph.validator.AbsenceValidator;
import fr.aleclerc.sprint.graph.validator.StoryValidator;
@Configuration
public class RestResourceConfiguration  extends RepositoryRestConfigurerAdapter {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Sprint.class,Story.class, Absence.class, Member.class, Project.class);
    }
    @Override
	public void configureValidatingRepositoryEventListener(ValidatingRepositoryEventListener validatingListener) {
    	validatingListener.addValidator("beforeCreate", new StoryValidator());
    	validatingListener.addValidator("beforeSave", new StoryValidator());
    	
    	validatingListener.addValidator("beforeCreate", new AbsenceValidator());
    	validatingListener.addValidator("beforeSave", new AbsenceValidator());
    }

}