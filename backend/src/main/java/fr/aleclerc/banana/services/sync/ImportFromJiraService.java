package fr.aleclerc.banana.services.sync;

import fr.aleclerc.banana.entities.Sprint;
import fr.aleclerc.banana.jira.app.service.IssueService;
import fr.aleclerc.banana.jira.app.service.SprintService;
import fr.aleclerc.banana.jira.app.utils.JiraApiUtils;
import io.reactivex.Observable;
import io.reactivex.Single;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class ImportFromJiraService implements IImportFromJiraService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ImportFromJiraService.class);

    @Autowired
    private IssueService issueService;

    @Autowired
    private SprintService sprintService;


    @Autowired
    private IStoryInSprintService storyInSprintService;

    @Override
    public Single<UUID> importFromJira(String id) {
        return sprintService.get(id)//
                .doOnSuccess(sprint -> LOGGER.info("Récupération du sprint {}", sprint.getId()))
                .map(JiraApiUtils::convertWithoutId)
                .flatMap(sprint -> Single.zip(
                        issueService.getFromSprint(String.valueOf(sprint.getJiraId()))//
                                .flatMapObservable(Observable::fromIterable)
                                .map(i -> JiraApiUtils.convertWithoutId(i, Optional.of(sprint.getJiraId())))//
                                .toList(),

                        sprintService.getRemovedStories(sprint.getBoardId(), sprint.getJiraId())//
                                .map(Map::entrySet)//
                                .flatMapObservable(Observable::fromIterable)//
                                .toMap(e -> JiraApiUtils.convertWithoutId(e.getKey(), Optional.of(sprint.getJiraId())), Map.Entry::getValue)

                        , (stories, removedStories) -> storyInSprintService.save(sprint, stories, removedStories))
                )
                .map(Sprint::getId);//

    }


}
