package fr.aleclerc.banana.entities;

import java.io.Serializable;
import java.util.UUID;

public class StoryInSprintId  implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 4434351942943019005L;

	private UUID sprint;
	
	private UUID story;
	
	public StoryInSprintId(){
	}

	public StoryInSprintId(UUID sprint, UUID story){
		this.sprint = sprint;
		this.story = story;
	}

	public UUID getSprint() {
		return sprint;
	}


	public UUID getStory() {
		return story;
	}

	
	public void setSprint(UUID sprint) {
		this.sprint = sprint;
	}

	public void setStory(UUID story) {
		this.story = story;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
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
		StoryInSprintId other = (StoryInSprintId) obj;
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
		return "StoryInSprintId [sprint=" + sprint + ", story=" + story + "]";
	}


}
