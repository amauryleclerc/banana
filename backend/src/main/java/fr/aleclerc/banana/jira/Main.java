package fr.aleclerc.banana.jira;

import java.net.URISyntaxException;
import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.client.AsyncRestTemplate;

import fr.aleclerc.banana.jira.pojo.BoardResponse;
import fr.aleclerc.banana.jira.pojo.IssueResponse;
import fr.aleclerc.banana.jira.pojo.SprintResponse;
import fr.aleclerc.banana.utils.RxUtils;

public class Main {

	private static final Logger LOGGER = LoggerFactory.getLogger(Main.class);

	public static void main(String[] args) throws URISyntaxException {

		AsyncRestTemplate restTemplate = new AsyncRestTemplate();
		restTemplate.setInterceptors(
				Arrays.asList(new ASyncBasicAuthorizationInterceptor("test", "test")));
		RxUtils.fromListenableFuture(
				restTemplate.getForEntity("http://localhost:8080/rest/agile/1.0/board", BoardResponse.class))//
				.map(r -> r.getValues().get(0))
				.flatMap(r -> RxUtils.fromListenableFuture(restTemplate.getForEntity(
						"http://localhost:8080/rest/agile/1.0/board/" + r.getId() + "/sprint", SprintResponse.class)))
				.map(r -> r.getValues().get(0))
				.flatMap(r -> RxUtils
						.fromListenableFuture(restTemplate.getForEntity("http://localhost:8080/rest/agile/1.0/board/"
								+ r.getOriginBoardId() + "/sprint/" + r.getId() + "/issue", IssueResponse.class)))
				.subscribe(v -> {
					LOGGER.info("issues : {}", v);
				}, RxUtils.logError(LOGGER));

	}

}
