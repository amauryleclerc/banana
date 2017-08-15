package fr.aleclerc.banana.controllers;

import fr.aleclerc.banana.entities.Sprint;
import fr.aleclerc.banana.entities.Story;
import fr.aleclerc.banana.jira.app.service.IssueService;
import fr.aleclerc.banana.jira.app.service.RxRestService;
import fr.aleclerc.banana.jira.app.service.SprintService;
import fr.aleclerc.banana.jira.app.utils.JiraApiUtils;
import fr.aleclerc.banana.services.sync.IImportFromJiraService;
import fr.aleclerc.banana.utils.RxUtils;
import io.reactivex.Observable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.async.DeferredResult;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/jira/sprint")
public class JiraSprintController {

    private static final Logger LOGGER = LoggerFactory.getLogger(JiraSprintController.class);

    @Autowired
    private SprintService sprintService;
    @Autowired
    private IssueService issueService;

    @Autowired
    private RxRestService rxRestService;

    @Autowired
    private IImportFromJiraService importFromJiraService;

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

    @RequestMapping(value = "/import/{id}", method = RequestMethod.GET)
    public DeferredResult<UUID> importFromJira(@PathVariable("id") String id) {
        return RxUtils.toDeferredResult(importFromJiraService.importFromJira(id));
    }

}
