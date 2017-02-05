package fr.aleclerc.sprint.graph.domain.plush;

import java.util.List;

public class PlushConfig {
	private List<Plush> plushs;

	public List<Plush> getPlushs() {
		return plushs;
	}

	public void setPlushs(List<Plush> plushs) {
		this.plushs = plushs;
	}

	@Override
	public String toString() {
		return "PlushConfig [plushs=" + plushs + "]";
	}
	
	
}
