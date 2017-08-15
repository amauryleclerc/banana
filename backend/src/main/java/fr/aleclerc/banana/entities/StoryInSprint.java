package fr.aleclerc.banana.entities;

import java.io.Serializable;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.rest.core.annotation.RestResource;

@Entity
@IdClass(StoryInSprintId.class)
public class StoryInSprint implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1765082858075649233L;

	@Id
	@ManyToOne
	@JoinColumn( nullable = false, insertable = false, updatable = false)
	private Story story;

	@Id
	@ManyToOne
	@JoinColumn(nullable = false, insertable = false, updatable = false)
	private Sprint sprint;

	@Column
	private Boolean isInScope;

	@Column
	private Boolean isBonus;

	@Column
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", timezone = "UTC")
	private Instant added;

	@Column
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", timezone = "UTC")
	private Instant removed;

	public Story getStory() {
		return story;
	}

	public void setStory(Story story) {
		this.story = story;
	}

	public Sprint getSprint() {
		return sprint;
	}

	public void setSprint(Sprint sprint) {
		this.sprint = sprint;
	}

	public Boolean getInScope() {
		return isInScope;
	}

	public void setInScope(Boolean inScope) {
		isInScope = inScope;
	}

	public Instant getRemoved() {
		return removed;
	}

	public void setRemoved(Instant removed) {
		this.removed = removed;
	}

	public Instant getAdded() {
		return added;
	}

	public void setAdded(Instant added) {
		this.added = added;
	}

	public Boolean getBonus() {
		return isBonus;
	}

	public void setBonus(Boolean bonus) {
		isBonus = bonus;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;

		StoryInSprint that = (StoryInSprint) o;

		if (!story.equals(that.story)) return false;
		if (!sprint.equals(that.sprint)) return false;
		if (isInScope != null ? !isInScope.equals(that.isInScope) : that.isInScope != null) return false;
		return removed != null ? removed.equals(that.removed) : that.removed == null;
	}

	@Override
	public int hashCode() {
		int result = story.hashCode();
		result = 31 * result + sprint.hashCode();
		result = 31 * result + (isInScope != null ? isInScope.hashCode() : 0);
		result = 31 * result + (removed != null ? removed.hashCode() : 0);
		return result;
	}


	@Override
	public String toString() {
		return "StoryInSprint{" +
				"story=" + story +
				", sprint=" + sprint +
				", isInScope=" + isInScope +
				", isBonus=" + isBonus +
				", added=" + added +
				", removed=" + removed +
				'}';
	}
}
