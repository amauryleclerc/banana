package fr.aleclerc.banana.services.sync;

import fr.aleclerc.banana.entities.Sprint;
import fr.aleclerc.banana.entities.Story;
import fr.aleclerc.banana.entities.StoryInSprint;

import java.util.List;

public interface IStoryInSprintService {
    Sprint save(Sprint sprint, List<Story> stories);
}
