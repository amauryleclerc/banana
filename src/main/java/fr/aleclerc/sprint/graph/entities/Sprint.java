package fr.aleclerc.sprint.graph.entities;

import java.time.Instant;
import java.util.Set;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class Sprint {
	@Id
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	@GeneratedValue(generator = "uuid")
	private UUID id;
	@Column(unique=true) 
	@NotNull
	private String name;
	@Column
	private Instant start;
	@Column
	private Instant end;
	@ManyToMany
	private Set<Story> stories;
	
	@ManyToOne
	private Project project;

	public UUID getId() {
		return id;
	}
	public void setId(UUID id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Instant getStart() {
		return start;
	}
	public void setStart(Instant start) {
		this.start = start;
	}
	public Instant getEnd() {
		return end;
	}
	public void setEnd(Instant end) {
		this.end = end;
	}
	public Set<Story> getStories() {
		return stories;
	}
	public void setStories(Set<Story> stories) {
		this.stories = stories;
	}
	public Project getProject() {
		return project;
	}
	public void setProject(Project project) {
		this.project = project;
	}

	public Float getBusinessValue() {
		return (float) stories.stream()//
				.filter(s -> s.getBusinessValue() != null)//
				.mapToLong(s -> s.getBusinessValue().longValue())//
				.sum();
	}
	
	public Float getComplexity() {
		return (float) stories.stream()//
				.filter(s -> s.getComplexity() != null)//
				.mapToLong(s -> s.getComplexity().longValue())//
				.sum();
	}

	@Override
	public int hashCode() {
		return id.hashCode();
	}

	@Override
	public boolean equals(Object obj) {
		return id.equals(obj);
	}

	
}
