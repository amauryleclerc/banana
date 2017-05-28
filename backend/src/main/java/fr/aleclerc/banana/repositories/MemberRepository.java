package fr.aleclerc.banana.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import fr.aleclerc.banana.entities.Member;


@RepositoryRestResource
public interface MemberRepository extends  JpaRepository<Member, UUID> {

}
