package fr.aleclerc.banana.jira.api.pojo;

import java.time.ZonedDateTime;

public class Sprint {
	private Integer id;
	private String self;
	private String state;
	private String name;
	private Integer originBoardId;
	private ZonedDateTime startDate;
	private ZonedDateTime endDate;
	private ZonedDateTime completeDate;

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

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getOriginBoardId() {
		return originBoardId;
	}

	public void setOriginBoardId(Integer originBoardId) {
		this.originBoardId = originBoardId;
	}

	public ZonedDateTime getStartDate() {
		return startDate;
	}

	public void setStartDate(ZonedDateTime startDate) {
		this.startDate = startDate;
	}

	public ZonedDateTime getEndDate() {
		return endDate;
	}

	public void setEndDate(ZonedDateTime endDate) {
		this.endDate = endDate;
	}

	public ZonedDateTime getCompleteDate() {
		return completeDate;
	}

	public void setCompleteDate(ZonedDateTime completeDate) {
		this.completeDate = completeDate;
	}

	@Override
	public String toString() {
		return "Sprint [id=" + id + ", self=" + self + ", state=" + state + ", name=" + name + ", originBoardId=" + originBoardId + ", startDate=" + startDate
				+ ", endDate=" + endDate + ", completeDate=" + completeDate + "]";
	}

}
