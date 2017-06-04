package fr.aleclerc.banana.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import fr.aleclerc.banana.entities.StoryInSprint;
import fr.aleclerc.banana.entities.StoryInSprintId;

@RepositoryRestResource(collectionResourceRel = "storiesInSprint", path = "stories-in-sprint")
public interface StoryInSprintRepository extends JpaRepository<StoryInSprint, StoryInSprintId>{

}
