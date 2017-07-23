package fr.aleclerc.banana.jira.app.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import fr.aleclerc.banana.jira.api.config.IJiraClientConfig;
import fr.aleclerc.banana.jira.api.pojo.Issue;
import fr.aleclerc.banana.jira.api.service.IIssueService;
import fr.aleclerc.banana.utils.Tuple;
import io.reactivex.Single;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class IssueService implements IIssueService {

    private static final Logger LOGGER = LoggerFactory.getLogger(IssueService.class);
    private final IJiraClientConfig config;

    private RxRestService restService;
    private ObjectMapper mapper;


    @Autowired
    public IssueService(RxRestService restService, IJiraClientConfig config) {
        this.mapper = new ObjectMapper();
        this.mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        this.mapper.findAndRegisterModules();
        this.restService = restService;
        this.config = config;
    }

    @Override
    public Single<Issue> get(String id) {
        return restService.get("/rest/agile/1.0/issue/" + id)//
                .map(this::getIssue)//
                .filter(Optional::isPresent)//
                .map(Optional::get)//
                .toSingle();
    }

    @Override
    public Single<List<Issue>> getFromSprint(String sprintId) {
        return restService.get("/rest/agile/1.0/sprint/" + sprintId + "/issue")//
                .map(this::getIssues);
    }

    private List<Issue> getIssues(JsonNode response) {
        JsonNode issues = response.get("issues");
        LOGGER.info("Parse {} issues",   issues.size());
        return StreamSupport.stream(issues.spliterator(), false)//
                .map(this::getIssue)//
                .filter(Optional::isPresent)//
                .map(Optional::get)//
                .collect(Collectors.toList());

    }

    private Optional<Issue> getIssue(JsonNode issue) {
        try {
            return Optional.<Issue>of(mapper.treeToValue(issue, Issue.class))//
                    .map(i -> {
                        i.getFields().getCustomFields().putAll(getCustomFields(issue));
                        Optional.ofNullable(i.getFields().getCustomFields().get("TYPE"))//
                                .flatMap(t -> Optional.ofNullable(config.getTypes().get(t)))//
                                .ifPresent(t -> i.getFields().getCustomFields().put("TYPE", t));//
                        return (Issue) i;
                    });
        } catch (

                JsonProcessingException e) {
            LOGGER.error("Error parsing Issue", e);
            return Optional.<Issue>empty();
        }

    }

    private Map<String, String> getCustomFields(JsonNode issue) {
        JsonNode fiels = issue.get("fields");
        return config.getCustomFields().entrySet().stream()//
                .map(entry -> Tuple.tuple(entry.getKey(), getValue(fiels, entry.getValue())))//
                .filter(t -> t.getB().isPresent())//
                .collect(Collectors.toMap(t -> (String) t.getA(), t -> String.valueOf(t.getB().get())));

    }

    private Optional<String> getValue(JsonNode nodeOrigin, String entry) {
        List<String> entries = Arrays.asList(entry.split("/"));
        Optional<JsonNode> node = Optional.of(nodeOrigin);
        for (String e : entries) {
            node = node.flatMap(n -> Optional.ofNullable(n.get(e)));
        }
        return node.map(n -> n.asText());
    }


}
