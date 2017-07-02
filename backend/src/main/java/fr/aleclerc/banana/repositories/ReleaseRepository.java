package fr.aleclerc.banana.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import fr.aleclerc.banana.entities.Release;

@RepositoryRestResource
public interface ReleaseRepository extends  JpaRepository<Release, UUID> {

}
