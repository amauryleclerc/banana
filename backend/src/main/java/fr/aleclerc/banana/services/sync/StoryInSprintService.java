package fr.aleclerc.banana.services.sync;

import fr.aleclerc.banana.entities.Sprint;
import fr.aleclerc.banana.entities.Story;
import fr.aleclerc.banana.entities.StoryInSprint;
import fr.aleclerc.banana.jira.app.service.IssueService;
import fr.aleclerc.banana.jira.app.service.SprintService;
import fr.aleclerc.banana.jira.app.utils.JiraApiUtils;
import fr.aleclerc.banana.repositories.SprintRepository;
import fr.aleclerc.banana.repositories.StoryInSprintRepository;
import fr.aleclerc.banana.repositories.StoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class StoryInSprintService implements IStoryInSprintService {

    private static final Logger LOGGER = LoggerFactory.getLogger(StoryInSprintService.class);

    @Autowired
    private IssueService issueService;

    @Autowired
    private SprintService sprintService;

    @Autowired
    private SprintRepository sprintRepository;
    @Autowired
    private StoryInSprintRepository storyInSprintRepository;
    @Autowired
    private StoryRepository storyRepository;


    @Transactional
    @Override
    public Sprint save(Sprint sprintOriginal, List<StoryInSprint> storiesOriginal) {
        Sprint sprint = checkSprint(sprintOriginal);
        List<StoryInSprint> stories = storiesOriginal.stream()
                .peek(s -> s.setStory(this.checkStory(s.getStory())))
                .collect(Collectors.toList());
        storyInSprintRepository.save(stories);
        storyInSprintRepository.flush();
        return sprint;
    }

    private Sprint checkSprint(Sprint sprint) {
        return sprintRepository.findByJiraId(sprint.getJiraId()).orElseGet(() -> sprintRepository.save(sprint));
    }

    private Story checkStory(Story story) {
        return storyRepository.findByJiraId(story.getJiraId()).orElseGet(() -> storyRepository.save(story));
    }
}

