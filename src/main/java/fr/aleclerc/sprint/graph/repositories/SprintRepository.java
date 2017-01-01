package fr.aleclerc.sprint.graph.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import fr.aleclerc.sprint.graph.entities.Sprint;

@RepositoryRestResource
public interface SprintRepository extends  JpaRepository<Sprint, UUID> {

}
