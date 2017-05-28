package fr.aleclerc.banana.repositories;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import fr.aleclerc.banana.entities.Story;


@RepositoryRestResource(collectionResourceRel = "stories", path = "stories")
public interface StoryRepository extends JpaRepository<Story, UUID>, QueryDslPredicateExecutor<Story> {

    // find by Name : for the "search" entry in API
    List<Story> findByName(@Param("name") String name);

    // to add further methods, please refer to excellent documentation below:
    // http://docs.spring.io/spring-data/jpa/docs/1.9.0.RELEASE/reference/html/#core.web.type-safe (chapter 4.3.2 related to QueryDSL queries)

    List<Story> findByAddDateBetween(@Param("addDateFrom") Instant addDateFrom, @Param("addDateTo") Instant addDateTo);

    List<Story> findByCloseDateBetween(@Param("closeDateFrom") Instant closeDateFrom, @Param("closeDateTo") Instant closeDateTo);

    List<Story> findByAddDateBetweenAndCloseDateBetween(@Param("addDateFrom") Instant addDateFrom, @Param("addDateTo") Instant addDateTo, @Param("closeDateFrom") Instant closeDateFrom, @Param("closeDateTo") Instant closeDateTo);
}
