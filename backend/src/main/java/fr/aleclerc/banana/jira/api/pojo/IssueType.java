package fr.aleclerc.banana.jira.api.pojo;

public class IssueType {
	private String self;
	private String id;
	private String description;
	private String iconUrl;
	private String name;
	private Boolean subtask;
	public String getSelf() {
		return self;
	}
	public void setSelf(String self) {
		this.self = self;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getIconUrl() {
		return iconUrl;
	}
	public void setIconUrl(String iconUrl) {
		this.iconUrl = iconUrl;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Boolean getSubtask() {
		return subtask;
	}
	public void setSubtask(Boolean subtask) {
		this.subtask = subtask;
	}
	@Override
	public String toString() {
		return "IssueType [self=" + self + ", id=" + id + ", description=" + description + ", iconUrl=" + iconUrl
				+ ", name=" + name + ", subtask=" + subtask + "]";
	}
	
	

}
