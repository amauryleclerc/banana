package fr.aleclerc.banana.jira.pojo;

import java.util.List;

public class Response<T> {
	private Integer maxResults;
	private Integer startAt;
	private Boolean isLast;
	private List<T> values;
	public Integer getMaxResults() {
		return maxResults;
	}
	public void setMaxResults(Integer maxResults) {
		this.maxResults = maxResults;
	}
	public Integer getStartAt() {
		return startAt;
	}
	public void setStartAt(Integer startAt) {
		this.startAt = startAt;
	}
	public Boolean getIsLast() {
		return isLast;
	}
	public void setIsLast(Boolean isLast) {
		this.isLast = isLast;
	}
	public List<T> getValues() {
		return values;
	}
	public void setValues(List<T> values) {
		this.values = values;
	}
	@Override
	public String toString() {
		return "Body [maxResults=" + maxResults + ", startAt=" + startAt + ", isLast=" + isLast + ", values=" + values
				+ "]";
	}
	
	
	
}
