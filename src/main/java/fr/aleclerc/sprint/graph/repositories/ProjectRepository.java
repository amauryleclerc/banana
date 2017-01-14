package fr.aleclerc.sprint.graph.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import fr.aleclerc.sprint.graph.entities.Project;

@RepositoryRestResource
public interface ProjectRepository extends  JpaRepository<Project, UUID> {

}
