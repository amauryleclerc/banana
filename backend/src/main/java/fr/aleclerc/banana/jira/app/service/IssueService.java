package fr.aleclerc.banana.jira.app.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.h2.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import fr.aleclerc.banana.jira.api.pojo.Issue;
import fr.aleclerc.banana.jira.api.service.IIssueService;
import fr.aleclerc.banana.utils.Tuple;
import io.reactivex.Single;

@Service
public class IssueService implements IIssueService {

	private final Logger LOGGER = LoggerFactory.getLogger(IssueService.class);

	private RxRestService restService;
	private Map<String, String> customFielsMapping;
	private ObjectMapper mapper;

	@Autowired
	public IssueService(RxRestService restService) {
		this.mapper = new ObjectMapper();
		this.mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		this.mapper.findAndRegisterModules();
		this.restService = restService;
		this.customFielsMapping = new HashMap<>();
		this.customFielsMapping.put("SP", "customfield_10541");
		this.customFielsMapping.put("BV", "customfield_11140");

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
						System.out.println(getCustomFields(issue));
						i.getFields().getCustomFields().putAll(getCustomFields(issue));
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
		return customFielsMapping.entrySet().stream()//
				.map(entry -> Tuple.tuple(entry.getKey(), Optional.ofNullable(fiels.get(entry.getValue()))//
						.map(v -> v.asText())))//
				.filter(t -> t.getB().isPresent())//
				.collect(Collectors.toMap(t -> (String) t.getA(), t -> String.valueOf(t.getB().get())));

	}

}
