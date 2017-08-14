package fr.aleclerc.banana.jira.app.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.aleclerc.banana.jira.api.pojo.Issue;
import fr.aleclerc.banana.jira.api.pojo.Sprint;
import fr.aleclerc.banana.jira.api.service.IBoardService;
import fr.aleclerc.banana.jira.api.service.IIssueService;
import fr.aleclerc.banana.jira.api.service.ISprintService;
import fr.aleclerc.banana.jira.app.response.ScopeChange;
import fr.aleclerc.banana.jira.app.response.ScopeChangeResponse;
import fr.aleclerc.banana.jira.app.response.SprintReportResponse;
import fr.aleclerc.banana.jira.app.response.SprintResponse;
import fr.aleclerc.banana.services.sync.StoryInSprintService;
import fr.aleclerc.banana.utils.Tuple;
import io.reactivex.Observable;
import io.reactivex.Single;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Paths;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SprintService implements ISprintService {
    private static final Logger LOGGER = LoggerFactory.getLogger(SprintService.class);
    private RxRestService restService;
    private IIssueService issueService;

    @Autowired
    public SprintService(RxRestService restService, IIssueService issueService) {
        this.restService = restService;
        this.issueService = issueService;
    }

    @Override
    public Single<Sprint> get(String id) {
        return restService.get("/rest/agile/1.0/sprint/" + id, Sprint.class);
    }


    @Override
    public Single<List<Sprint>> getFromBoard(String boardId) {
        return restService.get("/rest/agile/1.0/board/" + boardId + "/sprint", SprintResponse.class)//
                .map(SprintResponse::getValues);
    }


    private Single<SprintReportResponse> getReport() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.findAndRegisterModules();
        try {
            return Single.just(mapper.readValue(Paths.get("H:\\report.json").toFile(), SprintReportResponse.class));
        } catch (IOException e) {
            e.printStackTrace();
            return Single.error(e);
        }

    }

    private Single<ScopeChangeResponse> getChange() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.findAndRegisterModules();
        try {
            return Single.just(mapper.readValue(Paths.get("H:\\changes.json").toFile(), ScopeChangeResponse.class));
        } catch (IOException e) {
            e.printStackTrace();
            return Single.error(e);
        }
    }

    public Single<Map<Issue, Instant>> getRemovedStories(String boardId, String sprintId) {
        Single<SprintReportResponse> sprintReport = restService.get("/rest/greenhopper/1.0/rapid/charts/sprintreport?rapidViewId=" + boardId + "&sprintId=" + sprintId, SprintReportResponse.class);
        Single<ScopeChangeResponse> scopeChanges = restService.get("/rest/greenhopper/1.0/rapid/charts/scopechangeburndownchart?rapidViewId=" + boardId + "&sprintId=" + sprintId, ScopeChangeResponse.class);
//         Single<SprintReportResponse> sprintReport =getReport();
//        Single<ScopeChangeResponse> scopeChanges = getChange();
        return Single.zip(sprintReport, scopeChanges, (report, changes) ->
                report.getContents()
                        .getPuntedIssues()
                        .stream()
                        .map(s -> Tuple.tuple(s.getId(), getRemoveDate(s.getKey(), changes.getChanges())))
                        .collect(Collectors.toList())
        )//
                .flatMapObservable(Observable::fromIterable)//
                .filter(t -> t.getB().isPresent())
                .flatMap(t -> issueService.get(String.valueOf(t.getA()))
                        .toObservable()
                        .map(s -> Tuple.tuple(s, t.getB().get())))//
                .toMap(Tuple::getA, Tuple::getB);


    }

    private Optional<Instant> getRemoveDate(String key, Map<String, List<ScopeChange>> changes) {
        return changes.entrySet()//
                .stream()//
                .filter(e -> e.getValue()//
                        .stream()//
                        .anyMatch(c -> key.equals(c.getKey()) && Boolean.FALSE.equals(c.getAdded())))//
                .map(e -> Instant.ofEpochMilli(Long.valueOf(e.getKey())))//
                .sorted()//
                .reduce((first, second) -> second);

    }

}
