package fr.aleclerc.banana.jira.api.service;

import java.util.List;

import fr.aleclerc.banana.jira.api.pojo.Board;
import io.reactivex.Single;

public interface IBoardService extends IJiraApiService<Board>{

	 Single<List<Board>> getAll();

}
