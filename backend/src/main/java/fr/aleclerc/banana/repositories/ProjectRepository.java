package fr.aleclerc.banana.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import fr.aleclerc.banana.entities.Project;

@RepositoryRestResource
public interface ProjectRepository extends  JpaRepository<Project, UUID> {

}
