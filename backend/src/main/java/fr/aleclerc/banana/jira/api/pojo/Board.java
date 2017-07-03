package fr.aleclerc.banana.jira.api.pojo;

public class Board {
	private Integer id;
	private String self;
	private String name;
	private String type;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getSelf() {
		return self;
	}
	public void setSelf(String self) {
		this.self = self;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	@Override
	public String toString() {
		return "Board [id=" + id + ", self=" + self + ", name=" + name + ", type=" + type + "]";
	}
	
	
}
