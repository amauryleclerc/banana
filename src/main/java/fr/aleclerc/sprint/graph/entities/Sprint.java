package fr.aleclerc.sprint.graph.entities;

import java.time.Instant;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

@Entity
public class Sprint {
	@Id
	private String id;
	@Column
	private Instant start;
	@Column
	private Instant end;
	@ManyToMany
	private List<Story> stories;

	public Sprint() {

	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
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

	public List<Story> getStories() {
		return stories;
	}

	public void setStories(List<Story> stories) {
		this.stories = stories;
	}

	@Override
	public String toString() {
		return "Sprint [id=" + id + ", start=" + start + ", end=" + end + ", stories=" + stories + "]";
	}

}
