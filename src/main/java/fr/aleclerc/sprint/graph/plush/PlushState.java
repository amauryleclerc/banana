package fr.aleclerc.sprint.graph.plush;

public class PlushState {
	private Plush plush;
	private User owner;
	
	public Plush getPlush() {
		return plush;
	}
	public void setPlush(Plush plush) {
		this.plush = plush;
	}
	public User getOwner() {
		return owner;
	}
	public void setOwner(User owner) {
		this.owner = owner;
	}
	@Override
	public String toString() {
		return "PlushState [plush=" + plush + ", owner=" + owner + "]";
	}
	
	
	
	
	
}
