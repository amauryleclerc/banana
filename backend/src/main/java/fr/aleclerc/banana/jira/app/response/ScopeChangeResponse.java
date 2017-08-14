package fr.aleclerc.banana.jira.app.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ScopeChangeResponse {
    private Map<String,List<ScopeChange>> changes;

    public Map<String, List<ScopeChange>> getChanges() {
        return changes;
    }

    public void setChanges(Map<String, List<ScopeChange>> changes) {
        this.changes = changes;
    }
}
