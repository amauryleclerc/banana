package fr.aleclerc.banana.config;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import fr.aleclerc.banana.domain.plush.IPlushConfig;
import fr.aleclerc.banana.domain.plush.Plush;
import fr.aleclerc.banana.jira.api.config.IJiraClientConfig;

import java.util.List;
import java.util.Map;

public class BananaConfig implements IPlushConfig, IJiraClientConfig {

    private final Map<String, String> customFields;
    private final Map<String, String> types;
    private String jiraUser;
    private String jiraPassword;
    private String jiraUrl;
    private List<Plush> plushs;


    @JsonCreator
    public BananaConfig(
            @JsonProperty("jiraUser") String jiraUser,
            @JsonProperty("jiraPassword") String jiraPassword,
            @JsonProperty("jiraUrl") String jiraUrl,
            @JsonProperty("plushs") List<Plush> plushs,
            @JsonProperty("customFields") Map<String, String> customFields,
            @JsonProperty("types") Map<String, String> types ) {
        super();
        this.jiraUser = jiraUser;
        this.jiraPassword = jiraPassword;
        this.jiraUrl = jiraUrl;
        this.plushs = plushs;
        this.customFields = customFields;
        this.types = types;
    }

    @Override
    public String getUser() {
        return jiraUser;
    }

    @Override
    public String getPassword() {
        return jiraPassword;
    }

    @Override
    public String getUrl() {
        return jiraUrl;
    }

    @Override
    public Map<String, String> getCustomFields() {
        return customFields;
    }

    @Override
    public Map<String, String> getTypes() {
        return types;
    }

    @Override
    public List<Plush> getPlushs() {
        return plushs;
    }

    protected void setJiraPassword(String password) {
        this.jiraPassword = password;
    }


}