package fr.aleclerc.banana.jira.api.pojo;

import java.time.ZonedDateTime;
import java.util.HashMap;
import java.util.Map;

import fr.aleclerc.banana.utils.DateUtils;

public class Fields {
	private IssueType issuetype;
	private String timespent;
	private String timeoriginalestimate;
	private Sprint sprint;
	private String description;
	private Project project;
	private String aggregatetimespent;
	private String aggregatetimeestimate;
	private Boolean flagged;
	private ZonedDateTime resolutiondate;
	private Integer workratio;
	private String summary;
	private ZonedDateTime lastViewed;
	private ZonedDateTime created;
	private String environment;
	private String timeestimate;
	private String aggregatetimeoriginalestimate;
	private String duedate;
	private ZonedDateTime updated;
	
	public Map<String, String> customFields = new HashMap<>();
	
	public Map<String, String> getCustomFields() {
		return customFields;
	}
	
	public IssueType getIssuetype() {
		return issuetype;
	}

	public void setIssuetype(IssueType issuetype) {
		this.issuetype = issuetype;
	}


	public String getTimespent() {
		return timespent;
	}

	public void setTimespent(String timespent) {
		this.timespent = timespent;
	}

	public String getTimeoriginalestimate() {
		return timeoriginalestimate;
	}

	public void setTimeoriginalestimate(String timeoriginalestimate) {
		this.timeoriginalestimate = timeoriginalestimate;
	}

	public Sprint getSprint() {
		return sprint;
	}

	public void setSprint(Sprint sprint) {
		this.sprint = sprint;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	public String getAggregatetimespent() {
		return aggregatetimespent;
	}

	public void setAggregatetimespent(String aggregatetimespent) {
		this.aggregatetimespent = aggregatetimespent;
	}


	public String getAggregatetimeestimate() {
		return aggregatetimeestimate;
	}

	public void setAggregatetimeestimate(String aggregatetimeestimate) {
		this.aggregatetimeestimate = aggregatetimeestimate;
	}

	public Boolean getFlagged() {
		return flagged;
	}

	public void setFlagged(Boolean flagged) {
		this.flagged = flagged;
	}

	public ZonedDateTime getResolutiondate() {
		return resolutiondate;
	}

	public void setResolutiondate(String resolutiondate) {
		this.resolutiondate = DateUtils.getZonedDateTime(resolutiondate);
	}

	public Integer getWorkratio() {
		return workratio;
	}

	public void setWorkratio(Integer workratio) {
		this.workratio = workratio;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public ZonedDateTime getLastViewed() {
		return lastViewed;
	}

	public void setLastViewed(String lastViewed) {
		this.lastViewed = DateUtils.getZonedDateTime(lastViewed);
	}

	public ZonedDateTime getCreated() {
		return created;
	}

	public void setCreated(String created) {
		this.created = DateUtils.getZonedDateTime(created);
	}

	public String getEnvironment() {
		return environment;
	}

	public void setEnvironment(String environment) {
		this.environment = environment;
	}

	public String getTimeestimate() {
		return timeestimate;
	}

	public void setTimeestimate(String timeestimate) {
		this.timeestimate = timeestimate;
	}

	public String getAggregatetimeoriginalestimate() {
		return aggregatetimeoriginalestimate;
	}

	public void setAggregatetimeoriginalestimate(String aggregatetimeoriginalestimate) {
		this.aggregatetimeoriginalestimate = aggregatetimeoriginalestimate;
	}

	public String getDuedate() {
		return duedate;
	}

	public void setDuedate(String duedate) {
		this.duedate = duedate;
	}


	public ZonedDateTime getUpdated() {
		return updated;
	}

	public void setUpdated(String updated) {
		this.updated =  DateUtils.getZonedDateTime(updated);
	}
	
	


}
