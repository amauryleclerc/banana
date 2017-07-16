package fr.aleclerc.banana.jira.api.service;

import java.util.List;

import fr.aleclerc.banana.jira.api.pojo.Sprint;
import io.reactivex.Single;

public interface ISprintService  extends IJiraApiService<Sprint> {

	Single<List<Sprint>> getFromBoard(String boardId);
}
