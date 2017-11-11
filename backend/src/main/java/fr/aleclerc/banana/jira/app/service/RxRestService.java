package fr.aleclerc.banana.jira.app.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import fr.aleclerc.banana.jira.api.config.IJiraClientConfig;
import fr.aleclerc.banana.jira.api.service.IRxRestService;
import io.reactivex.Single;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Base64Utils;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.adapter.rxjava.RxJava2Adapter;

import java.nio.charset.Charset;

@Service
public class RxRestService implements IRxRestService {
    private static final Logger LOGGER = LoggerFactory.getLogger(RxRestService.class);
    private static final Charset UTF_8 = Charset.forName("UTF-8");
    private final WebClient client;
    private IJiraClientConfig config;
    private ObjectMapper mapper;

    @Autowired
    public RxRestService(IJiraClientConfig config) {
        this.config = config;
        String token = Base64Utils.encodeToString((this.config.getUser() + ":" + this.config.getPassword()).getBytes(UTF_8));
        this.client = WebClient.builder()//
                .baseUrl(config.getUrl())//
                .defaultHeader("Authorization", "Basic " + token)//
                .build();
        this.mapper = new ObjectMapper();
        this.mapper.registerModule(new Jdk8Module());
    }


    @Override
    public <T> Single<T> get(String contextPath, Class<T> response) {
        LOGGER.info("Request Jira : {}", contextPath);

        return RxJava2Adapter.monoToSingle(client
                .get()//
                .uri(contextPath)//
                .exchange()//
                .flatMap(cr -> cr.bodyToMono(response)));

    }

    @Override
    public Single<JsonNode> get(String contextPath) {
        LOGGER.info("Request Jira : {}", contextPath);
//		try {
//			return Single.just(mapper.readTree(Paths.get("H:\\issues.json").toFile()));
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		return Single.just(null);

        return RxJava2Adapter.monoToSingle(client
                .get()//
                .uri(contextPath)//
                .exchange()//
                .flatMap(cr -> cr.bodyToMono(String.class)))
                .map(json -> mapper.readTree(json));

    }
}
