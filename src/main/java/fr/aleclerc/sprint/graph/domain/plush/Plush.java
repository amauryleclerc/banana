package fr.aleclerc.sprint.graph.domain.plush;

public class Plush {

	private String id;
	private String name;
	private String img;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}
	@Override
	public String toString() {
		return "Plush [id=" + id + ", name=" + name + ", img=" + img + "]";
	}
	
	
}
