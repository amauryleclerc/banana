package fr.aleclerc.banana.jira.app.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SprintReportContent {

    private List<IssueEntry> puntedIssues;


    public List<IssueEntry> getPuntedIssues() {
        return puntedIssues;
    }

    public void setPuntedIssues(List<IssueEntry> puntedIssues) {
        this.puntedIssues = puntedIssues;
    }
}
