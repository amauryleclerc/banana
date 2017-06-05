package fr.aleclerc.banana.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import fr.aleclerc.banana.entities.StoryInSprint;
import fr.aleclerc.banana.entities.StoryInSprintId;
import fr.aleclerc.banana.entities.projections.InlineStoryInSprintProjection;

@RepositoryRestResource(collectionResourceRel = "storiesInSprint", path = "stories-in-sprint", excerptProjection = InlineStoryInSprintProjection.class)
public interface StoryInSprintRepository extends JpaRepository<StoryInSprint, StoryInSprintId>{

}
