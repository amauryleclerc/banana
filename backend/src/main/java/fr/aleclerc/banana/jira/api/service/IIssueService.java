package fr.aleclerc.banana.jira.api.service;

import java.util.List;

import fr.aleclerc.banana.jira.api.pojo.Issue;
import io.reactivex.Observable;

public interface IIssueService extends IJiraApiService<Issue> {

	Observable<List<Issue>> getFromSprint(String boardId, String sprintId);
}
