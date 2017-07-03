package fr.aleclerc.banana.jira.app.interceptor;

import java.io.IOException;
import java.nio.charset.Charset;

import org.springframework.http.HttpRequest;
import org.springframework.http.client.AsyncClientHttpRequestExecution;
import org.springframework.http.client.AsyncClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.util.Assert;
import org.springframework.util.Base64Utils;
import org.springframework.util.concurrent.ListenableFuture;

public class ASyncBasicAuthorizationInterceptor implements AsyncClientHttpRequestInterceptor {

	private static final Charset UTF_8 = Charset.forName("UTF-8");

	private final String username;

	private final String password;

	/**
	 * Create a new interceptor which adds a BASIC authorization header for the
	 * given username and password.
	 * 
	 * @param username
	 *            the username to use
	 * @param password
	 *            the password to use
	 */
	public ASyncBasicAuthorizationInterceptor(String username, String password) {
		Assert.hasLength(username, "Username must not be empty");
		this.username = username;
		this.password = (password != null ? password : "");
	}

	@Override
	public ListenableFuture<ClientHttpResponse> intercept(HttpRequest request, byte[] body,
			AsyncClientHttpRequestExecution execution) throws IOException {
		String token = Base64Utils.encodeToString((this.username + ":" + this.password).getBytes(UTF_8));
		request.getHeaders().add("Authorization", "Basic " + token);
		return execution.executeAsync(request, body);
	}



}
