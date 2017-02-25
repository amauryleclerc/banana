package fr.aleclerc.sprint.graph.repositories;

import java.util.UUID;

import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import fr.aleclerc.sprint.graph.entities.Story;

@RepositoryRestResource(collectionResourceRel = "stories", path = "stories")
public interface StoryRepository extends PagingAndSortingRepository<Story, UUID>, QueryDslPredicateExecutor<Story> {

}
