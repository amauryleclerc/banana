package fr.aleclerc.banana.jira;

import java.util.Arrays;

import org.springframework.web.client.AsyncRestTemplate;

import fr.aleclerc.banana.jira.app.interceptor.ASyncBasicAuthorizationInterceptor;
import fr.aleclerc.banana.utils.RxUtils;
import io.reactivex.Single;

public class TestApp {

	public static void main(String[] args) throws Exception {
		AsyncRestTemplate restTemplate = new AsyncRestTemplate();

		restTemplate.setInterceptors(Arrays.asList(new ASyncBasicAuthorizationInterceptor("test", "test")));

		RxUtils.fromListenableFuture(restTemplate.getForEntity("http://localhost:8080/rest/agile/1.0/issue/10000", String.class))//
				.subscribe(v -> System.out.println(v));

	}

}
