package fr.aleclerc.banana.jira.app.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SprintReportResponse {

    private SprintReportContent contents;

    public SprintReportContent getContents() {
        return contents;
    }

    public void setContents(SprintReportContent contents) {
        this.contents = contents;
    }
}
