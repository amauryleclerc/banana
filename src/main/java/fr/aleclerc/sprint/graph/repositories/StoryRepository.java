package fr.aleclerc.sprint.graph.repositories;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import fr.aleclerc.sprint.graph.entities.Story;

@RepositoryRestResource(collectionResourceRel = "stories", path = "stories")
public interface StoryRepository extends JpaRepository<Story, UUID>, QueryDslPredicateExecutor<Story> {

    // find by Name : for the "search" entry in API
    List<Story> findByName(@Param("name") String name);

    List<Story> findByAddDateBetween(@Param("addDateFrom") Instant addDateFrom, @Param("addDateTo") Instant addDateTo);

    List<Story> findByCloseDateBetween(@Param("closeDateFrom") Instant closeDateFrom, @Param("closeDateTo") Instant closeDateTo);

    List<Story> findByAddDateBetweenAndCloseDateBetween(@Param("addDateFrom") Instant addDateFrom, @Param("addDateTo") Instant addDateTo, @Param("closeDateFrom") Instant closeDateFrom, @Param("closeDateTo") Instant closeDateTo);
}
