package fr.aleclerc.banana.jira;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.aleclerc.banana.config.BananaConfig;
import fr.aleclerc.banana.jira.api.config.IJiraClientConfig;
import fr.aleclerc.banana.jira.api.pojo.Issue;
import fr.aleclerc.banana.jira.app.service.IssueService;
import fr.aleclerc.banana.jira.app.service.RxRestService;
import fr.aleclerc.banana.jira.app.service.SprintService;

import java.nio.file.Paths;
import java.time.Instant;
import java.util.Map;

public class TestApp {


    public static void main(String[] args) throws Exception {
        ObjectMapper mapper = new ObjectMapper();

        IJiraClientConfig config = mapper.readValue(Paths.get("H:\\banana-config.json").toFile(), BananaConfig.class);


        RxRestService rs = new RxRestService(config);
        IssueService is = new IssueService(rs, config);
        SprintService ss = new SprintService(rs, is);

        Map<Issue, Instant> map = ss.getRemovedStories("test", "test").blockingGet();

        System.out.println("map = " + map);

//
//		List<Issue> issues = is.getFromSprint("100").blockingGet();
//
//		issues.stream().map(i -> i.getFields().getCustomFields()).forEach(m -> System.out.println(m));


//		String str = "2017-07-19T08:06:25.544+0200";
//		ObjectMapper mapper = new ObjectMapper();
//		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
//		mapper.findAndRegisterModules();
//		
//	
//		ZonedDateTime odt = ZonedDateTime.parse ( str.substring(0, str.indexOf('+'))+"Z" );
//	   
//		System.out.println(odt);
//	
//		AsyncRestTemplate restTemplate = new AsyncRestTemplate();
//
//
//		RxUtils.fromListenableFuture(restTemplate.getForEntity("http://localhost:8080/rest/agile/1.0/issue/10000", String.class))//
//				.subscribe(v -> System.out.println(v));

    }

}
