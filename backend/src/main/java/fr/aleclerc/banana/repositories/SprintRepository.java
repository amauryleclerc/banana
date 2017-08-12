package fr.aleclerc.banana.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import fr.aleclerc.banana.entities.Sprint;


@RepositoryRestResource
public interface SprintRepository extends  JpaRepository<Sprint, UUID> {


    Optional<Sprint> findByJiraId(String jiraId);

}
