package fr.aleclerc.banana.entities.projections;

import org.springframework.data.rest.core.config.Projection;

import fr.aleclerc.banana.entities.Sprint;
import fr.aleclerc.banana.entities.Story;
import fr.aleclerc.banana.entities.StoryInSprint;

@Projection(name = "InlineStoryInSprint", types = { StoryInSprint.class })
public interface InlineStoryInSprintProjection {

	Story getStory();

	//Sprint getSprint();

	Boolean getIsInScope();

}
