package fr.aleclerc.banana.services.sync;

import fr.aleclerc.banana.entities.Sprint;
import fr.aleclerc.banana.entities.Story;
import fr.aleclerc.banana.entities.StoryInSprint;

import java.time.Instant;
import java.util.List;
import java.util.Map;

public interface IStoryInSprintService {
    Sprint save(Sprint sprint, List<Story> stories, Map<Story, Instant> removedStories);
}
