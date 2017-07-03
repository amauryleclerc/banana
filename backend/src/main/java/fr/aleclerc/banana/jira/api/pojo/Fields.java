package fr.aleclerc.banana.jira.api.pojo;

import java.util.List;

public class Fields {
	private IssueType issuetype;
	private List<String> components;
	private String timespent;
	private String timeoriginalestimate;
	private Sprint sprint;
	private String description;
	private Project project;
	private List<String> fixVersions;
	private String aggregatetimespent;
	private String resolution;
	//private String timetracking;
	//private String attachment;
	private String aggregatetimeestimate;
	private Boolean flagged;
	private String resolutiondate;
	private Integer workratio;
	private String summary;
	private String lastViewed;
//	private String watches; //TODO
//	private String creator; //TODO
//	private String subtasks; //TODO
	private String created;
//	private String reporter; //TODO
	private String customfield_10000;
//	private String aggregateprogress;//TODO
//	private String priority;//TODO
	private List<String> labels;
	private String environment;
	private String timeestimate;
	private String aggregatetimeoriginalestimate;
	private List<String> versions;
	private String duedate;
//	private String progress; //TODO
//	private String comments; //TODO
	private List<String> issueLinks;
//	private String votes; //TODO
//	private String worklog; //TODO
//	private String assignee;//TODO
	private String updated;
//	private String status; //TODO
	public IssueType getIssuetype() {
		return issuetype;
	}
	public void setIssuetype(IssueType issuetype) {
		this.issuetype = issuetype;
	}
	public List<String> getComponents() {
		return components;
	}
	public void setComponents(List<String> components) {
		this.components = components;
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
	public List<String> getFixVersions() {
		return fixVersions;
	}
	public void setFixVersions(List<String> fixVersions) {
		this.fixVersions = fixVersions;
	}
	public String getAggregatetimespent() {
		return aggregatetimespent;
	}
	public void setAggregatetimespent(String aggregatetimespent) {
		this.aggregatetimespent = aggregatetimespent;
	}
	public String getResolution() {
		return resolution;
	}
	public void setResolution(String resolution) {
		this.resolution = resolution;
	}
//	public String getTimetracking() {
//		return timetracking;
//	}
//	public void setTimetracking(String timetracking) {
//		this.timetracking = timetracking;
//	}
//	public String getAttachment() {
//		return attachment;
//	}
//	public void setAttachment(String attachment) {
//		this.attachment = attachment;
//	}

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
	public String getResolutiondate() {
		return resolutiondate;
	}
	public void setResolutiondate(String resolutiondate) {
		this.resolutiondate = resolutiondate;
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
	public String getLastViewed() {
		return lastViewed;
	}
	public void setLastViewed(String lastViewed) {
		this.lastViewed = lastViewed;
	}
//	public String getWatches() {
//		return watches;
//	}
//	public void setWatches(String watches) {
//		this.watches = watches;
//	}
//	public String getCreator() {
//		return creator;
//	}
//	public void setCreator(String creator) {
//		this.creator = creator;
//	}
//	public String getSubtasks() {
//		return subtasks;
//	}
//	public void setSubtasks(String subtasks) {
//		this.subtasks = subtasks;
//	}
	public String getCreated() {
		return created;
	}
	public void setCreated(String created) {
		this.created = created;
	}
//	public String getReporter() {
//		return reporter;
//	}
//	public void setReporter(String reporter) {
//		this.reporter = reporter;
//	}
	public String getCustomfield_10000() {
		return customfield_10000;
	}
	public void setCustomfield_10000(String customfield_10000) {
		this.customfield_10000 = customfield_10000;
	}
//	public String getAggregateprogress() {
//		return aggregateprogress;
//	}
//	public void setAggregateprogress(String aggregateprogress) {
//		this.aggregateprogress = aggregateprogress;
//	}
//	public String getPriority() {
//		return priority;
//	}
//	public void setPriority(String priority) {
//		this.priority = priority;
//	}
	public List<String> getLabels() {
		return labels;
	}
	public void setLabels(List<String> labels) {
		this.labels = labels;
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
	public List<String> getVersions() {
		return versions;
	}
	public void setVersions(List<String> versions) {
		this.versions = versions;
	}
	public String getDuedate() {
		return duedate;
	}
	public void setDuedate(String duedate) {
		this.duedate = duedate;
	}
//	public String getProgress() {
//		return progress;
//	}
//	public void setProgress(String progress) {
//		this.progress = progress;
//	}
//	public String getComments() {
//		return comments;
//	}
//	public void setComments(String comments) {
//		this.comments = comments;
//	}
	public List<String> getIssueLinks() {
		return issueLinks;
	}
	public void setIssueLinks(List<String> issueLinks) {
		this.issueLinks = issueLinks;
	}
//	public String getVotes() {
//		return votes;
//	}
//	public void setVotes(String votes) {
//		this.votes = votes;
//	}
//	public String getWorklog() {
//		return worklog;
//	}
//	public void setWorklog(String worklog) {
//		this.worklog = worklog;
//	}
//	public String getAssignee() {
//		return assignee;
//	}
//	public void setAssignee(String assignee) {
//		this.assignee = assignee;
//	}
	public String getUpdated() {
		return updated;
	}
	public void setUpdated(String updated) {
		this.updated = updated;
	}
//	public String getStatus() {
//		return status;
//	}
//	public void setStatus(String status) {
//		this.status = status;
//	}
	@Override
	public String toString() {
		return "Fields [issueType=" + issuetype + ", components=" + components + ", timespent=" + timespent
				+ ", timeoriginalestimate=" + timeoriginalestimate + ", sprint=" + sprint + ", description="
				+ description + ", project=" + project + ", fixVersions=" + fixVersions + ", aggregatetimespent="
				+ aggregatetimespent + ", resolution=" + resolution + ", aggregatetimeestimate=" + aggregatetimeestimate
				+ ", flagged=" + flagged + ", resolutiondate=" + resolutiondate + ", workratio=" + workratio
				+ ", summary=" + summary + ", lastViewed=" + lastViewed + ", created=" + created
				+ ", customfield_10000=" + customfield_10000 + ", labels=" + labels + ", environment=" + environment
				+ ", timeestimate=" + timeestimate + ", aggregatetimeoriginalestimate=" + aggregatetimeoriginalestimate
				+ ", versions=" + versions + ", duedate=" + duedate + ", issueLinks=" + issueLinks + ", updated="
				+ updated + "]";
	}

	
	

}
