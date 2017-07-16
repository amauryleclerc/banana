package fr.aleclerc.banana.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.async.DeferredResult;

import fr.aleclerc.banana.entities.Sprint;
import fr.aleclerc.banana.entities.Story;
import fr.aleclerc.banana.jira.app.service.IssueService;
import fr.aleclerc.banana.jira.app.service.SprintService;
import fr.aleclerc.banana.jira.app.utils.JiraApiUtils;
import fr.aleclerc.banana.utils.RxUtils;
import io.reactivex.Observable;

@RestController
@RequestMapping(value="/api/jira/sprint")
public class JiraSprintController {

	@Autowired
	private SprintService sprintService;
	@Autowired
	private IssueService issueService;
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public DeferredResult<Sprint> get(@PathVariable("id") String id) {
		return RxUtils.toDeferredResult(sprintService.get(id)//
				.map(JiraApiUtils::convert));
	}
	@RequestMapping(value = "/{id}/stories", method = RequestMethod.GET)
	public DeferredResult<List<Story>> getStories(@PathVariable("id") String id) {
		return RxUtils.toDeferredResult(issueService.getFromSprint(id)//
				.flatMapObservable(Observable::fromIterable)
				.map(JiraApiUtils::convert)//
				.toList());
	}

}
