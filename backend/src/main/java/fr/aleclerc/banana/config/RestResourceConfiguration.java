package fr.aleclerc.banana.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.core.event.ValidatingRepositoryEventListener;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

import fr.aleclerc.banana.entities.Absence;
import fr.aleclerc.banana.entities.Member;
import fr.aleclerc.banana.entities.Project;
import fr.aleclerc.banana.entities.Sprint;
import fr.aleclerc.banana.entities.Story;
import fr.aleclerc.banana.validator.AbsenceValidator;
import fr.aleclerc.banana.validator.StoryValidator;



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