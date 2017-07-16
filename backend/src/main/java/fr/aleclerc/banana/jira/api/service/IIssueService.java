package fr.aleclerc.banana.jira.api.service;

import java.util.List;

import fr.aleclerc.banana.jira.api.pojo.Issue;
import io.reactivex.Single;

public interface IIssueService extends IJiraApiService<Issue> {

	Single<List<Issue>> getFromSprint(String sprintId);
}
