package fr.aleclerc.sprint.graph.repositories;

import fr.aleclerc.sprint.graph.entities.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.UUID;

@RepositoryRestResource
public interface ReleaseRepository extends JpaRepository<Project, UUID> {
}
