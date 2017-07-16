package fr.aleclerc.banana.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.async.DeferredResult;

import fr.aleclerc.banana.entities.Story;
import fr.aleclerc.banana.jira.app.service.IssueService;
import fr.aleclerc.banana.jira.app.utils.JiraApiUtils;
import fr.aleclerc.banana.utils.RxUtils;

@RestController
@RequestMapping("/api/jira/story")
public class JiraStoryController {

	@Autowired
	private IssueService issueService;

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public DeferredResult<Story> get(@PathVariable("id") String id) {
		return RxUtils.toDeferredResult(issueService.get(id)//
				.map(JiraApiUtils::convert));
	}


}
