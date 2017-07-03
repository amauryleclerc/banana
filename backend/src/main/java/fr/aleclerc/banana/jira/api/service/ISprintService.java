package fr.aleclerc.banana.jira.api.service;

import java.util.List;

import fr.aleclerc.banana.jira.api.pojo.Sprint;
import io.reactivex.Observable;

public interface ISprintService  extends IJiraApiService<Sprint> {

	Observable<List<Sprint>> getFromBoard(String boardId);
}
