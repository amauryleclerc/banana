package fr.aleclerc.banana.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.async.DeferredResult;

import fr.aleclerc.banana.entities.Project;
import fr.aleclerc.banana.entities.Sprint;
import fr.aleclerc.banana.jira.app.service.BoardService;
import fr.aleclerc.banana.jira.app.service.SprintService;
import fr.aleclerc.banana.jira.app.utils.JiraApiUtils;
import fr.aleclerc.banana.utils.RxUtils;
import io.reactivex.Observable;

@RestController
@RequestMapping(value="/api/jira/project")
public class JiraProjectController {

	@Autowired
	private BoardService boardService;
	@Autowired
	private SprintService sprintService;
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public DeferredResult<Project> get(@PathVariable("id") String id) {
		return RxUtils.toDeferredResult(boardService.get(id)//
				.map(JiraApiUtils::convert));
	}
	
	@RequestMapping( method = RequestMethod.GET)
	public DeferredResult<List<Project>> get() {
		return RxUtils.toDeferredResult(boardService.getAll()
				.flatMapObservable(Observable::fromIterable)
				.map(JiraApiUtils::convert)//
				.toList());
	}
	
	@RequestMapping(value = "/{id}/sprints", method = RequestMethod.GET)
	public DeferredResult<List<Sprint>> getSprints(@PathVariable("id") String id) {
		return RxUtils.toDeferredResult(sprintService.getFromBoard(id)//
				.flatMapObservable(Observable::fromIterable)
				.map(JiraApiUtils::convert)//
				.toList());
	}

}
