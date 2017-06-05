package fr.aleclerc.banana.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

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

	public Boolean getIsInScope() {
		return isInScope;
	}

	public void setIsInScope(Boolean isInScope) {
		this.isInScope = isInScope;
	}

	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((isInScope == null) ? 0 : isInScope.hashCode());
		result = prime * result + ((sprint == null) ? 0 : sprint.hashCode());
		result = prime * result + ((story == null) ? 0 : story.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		StoryInSprint other = (StoryInSprint) obj;
		if (isInScope == null) {
			if (other.isInScope != null)
				return false;
		} else if (!isInScope.equals(other.isInScope))
			return false;
		if (sprint == null) {
			if (other.sprint != null)
				return false;
		} else if (!sprint.equals(other.sprint))
			return false;
		if (story == null) {
			if (other.story != null)
				return false;
		} else if (!story.equals(other.story))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "StoryInSprint [story=" + story + ", sprint=" + sprint + ", isInScope=" + isInScope + "]";
	}
	

}
