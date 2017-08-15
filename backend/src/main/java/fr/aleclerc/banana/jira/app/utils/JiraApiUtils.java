package fr.aleclerc.banana.jira.app.utils;

import fr.aleclerc.banana.entities.*;
import fr.aleclerc.banana.jira.api.pojo.Board;
import fr.aleclerc.banana.jira.api.pojo.History;
import fr.aleclerc.banana.jira.api.pojo.Issue;
import fr.aleclerc.banana.jira.api.pojo.Item;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.swing.text.html.Option;
import java.time.Instant;
import java.util.*;

public class JiraApiUtils {

    private static final Logger LOGGER = LoggerFactory.getLogger(JiraApiUtils.class);

    private JiraApiUtils() {

    }

    public static Project convert(Board p) {
        Project project = new Project();
        project.setId(UUID.randomUUID());
        project.setName(p.getName());
        project.setJiraId(p.getId().toString());
        return project;
    }

    public static Sprint convert(fr.aleclerc.banana.jira.api.pojo.Sprint s) {
        Sprint sprint = new Sprint();
        sprint.setName(s.getName());
        sprint.setJiraId(s.getId().toString());
        if (s.getEndDate() != null) {
            sprint.setEnd(s.getEndDate().toInstant());
        }
        if (s.getStartDate() != null) {
            sprint.setStart(s.getStartDate().toInstant());
        }
        sprint.setBoardId(String.valueOf(s.getOriginBoardId()));
        return sprint;
    }


    private static boolean isItemToMatching(Item item, String sprintId) {
        if (item.getField() == null || item.getTo() == null) {
            return false;
        }
        boolean isFieldMatching = "Sprint".equals(item.getField());
        List<String> to = Arrays.asList(item.getTo().split(", "));
        boolean isToMatching = to.contains(sprintId);
        return isFieldMatching && isToMatching;

    }

    private static boolean isItemFromMatching(Item item, String sprintId) {
        if (item.getField() == null || item.getTo() == null) {
            return false;
        }
        boolean isFieldMatching = "Sprint".equals(item.getField());
        List<String> to = Arrays.asList(item.getTo().split(", "));
        boolean isToMatching = to.contains(sprintId);
        return isFieldMatching && isToMatching;

    }


    public static StoryInSprint convert(Issue i, Sprint sprint) {
        StoryInSprint storyInSprint = new StoryInSprint();
        Story story = convert(i);
        storyInSprint.setStory(story);
        storyInSprint.setSprint(sprint);
        storyInSprint.setInScope(true);
        storyInSprint.setBonus(false);
        Optional<History> historyToOptional = Optional.ofNullable(i.getChangelog())
                .flatMap(changelog -> changelog.getHistories()
                        .stream()
                        .filter(history -> history.getItems().stream().anyMatch(item -> isItemToMatching(item, sprint.getJiraId())))
                        .sorted(Comparator.comparing(History::getCreated))
                        .reduce((first, second) -> second)
                );
        Optional<History> historyFromOptional = Optional.ofNullable(i.getChangelog())
                .flatMap(changelog -> changelog.getHistories()
                        .stream()
                        .filter(history -> history.getItems().stream().anyMatch(item -> isItemFromMatching(item, sprint.getJiraId())))
                        .sorted(Comparator.comparing(History::getCreated))
                        .reduce((first, second) -> second)
                );
        if (historyToOptional.isPresent()) {
            storyInSprint.setAdded(historyToOptional.get().getCreated().toInstant());
        } else if (i.getFields() != null && i.getFields().getCreated() != null) {
            storyInSprint.setAdded(i.getFields().getCreated().toInstant());
        }
        if (historyFromOptional.isPresent() && historyFromOptional.get().getCreated().toInstant().isAfter(storyInSprint.getAdded())) {
            storyInSprint.setRemoved(historyFromOptional.get().getCreated().toInstant());
            storyInSprint.setInScope(false);
        }
        return storyInSprint;

    }


    public static Story convert(Issue i) {
        Story story = new Story();
        story.setName(i.getKey());
        story.setJiraId(i.getId());
        if (i.getFields() != null) {
            if (i.getFields().getResolutiondate() != null) {
                story.setCloseDate(i.getFields().getResolutiondate().toInstant());
            }
            String sp = i.getFields().getCustomFields().get("SP");
            if (sp != null && !"null".equals(sp)) {
                try {
                    story.setComplexity(Float.valueOf(sp));
                } catch (NumberFormatException e) {
                    LOGGER.error("Convert Story poinrt fail", e);
                }
            }
            String bv = i.getFields().getCustomFields().get("BV");
            if (bv != null && !"null".equals(bv)) {
                try {
                    story.setBusinessValue(Float.valueOf(i.getFields().getCustomFields().get("BV")));
                } catch (NumberFormatException e) {
                    LOGGER.error("Convert business value fail", e);
                }
            }
            String type = i.getFields().getCustomFields().get("TYPE");
            if (type != null && !"null".equals(type)) {
                try {
                    story.setType(EStoryType.valueOf(type));
                } catch (IllegalArgumentException e) {
                    LOGGER.error("Convert story type fail", e);
                }
            }

        }
        return story;
    }


}
