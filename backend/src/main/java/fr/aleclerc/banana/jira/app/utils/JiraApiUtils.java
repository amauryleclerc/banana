package fr.aleclerc.banana.jira.app.utils;

import java.util.UUID;

import org.springframework.util.StringUtils;

import fr.aleclerc.banana.entities.Project;
import fr.aleclerc.banana.entities.Sprint;
import fr.aleclerc.banana.entities.Story;
import fr.aleclerc.banana.jira.api.pojo.Board;
import fr.aleclerc.banana.jira.api.pojo.Issue;

public class JiraApiUtils {

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
		sprint.setId(UUID.randomUUID());
		sprint.setName(s.getName());
		sprint.setJiraId(s.getId().toString());
		if (s.getEndDate() != null) {
			sprint.setEnd(s.getEndDate().toInstant());
		}
		if (s.getStartDate() != null) {
			sprint.setStart(s.getStartDate().toInstant());
		}
		return sprint;
	}

	public static Story convert(Issue i) {
		Story story = new Story();
		story.setId(UUID.randomUUID());
		story.setName(i.getKey());
		story.setJiraId(i.getId());
		if (i.getFields() != null) {

			if (i.getFields().getSprint() != null && i.getFields().getSprint().getStartDate() != null) {
				story.setAddDate(i.getFields().getSprint().getStartDate().toInstant());

			}
			if (i.getFields().getResolutiondate() != null) {
				story.setCloseDate(i.getFields().getResolutiondate().toInstant());
			}
			if (i.getFields().getCustomFields().get("SP") != null) {
				try {
					story.setComplexity(Float.valueOf(i.getFields().getCustomFields().get("SP")));
				} catch (NumberFormatException  e) {
					// TODO: handle exception
				}
			}
			if (i.getFields().getCustomFields().get("BV") != null) {
				try {
					story.setBusinessValue(Float.valueOf(i.getFields().getCustomFields().get("BV")));
				} catch (NumberFormatException  e) {
					// TODO: handle exception
				}
			}

		}
		return story;
	}
}
