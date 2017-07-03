package fr.aleclerc.banana.jira;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import ch.qos.logback.core.net.SyslogOutputStream;
import fr.aleclerc.banana.jira.app.service.BoardService;
import fr.aleclerc.banana.jira.app.service.IssueService;
import fr.aleclerc.banana.jira.app.service.SprintService;
import io.reactivex.Observable;

@SpringBootApplication
public class Main {

	private static final Logger LOGGER = LoggerFactory.getLogger(Main.class);

	    @Autowired
	    private BoardService boardService;

	    @Autowired
	    private SprintService sprintService;

	    @Autowired
	    private IssueService issueService;

	    @PostConstruct
	    public void init() { 
	    	LOGGER.info("init {}",boardService);
	    	boardService.getAll()//
	    	.flatMap(b -> Observable.fromIterable(b).take(1))//
	    	.flatMap(b -> sprintService.getFromBoard(b.getId().toString()))
	    	.flatMap(s -> Observable.fromIterable(s).take(1))//
	    	.flatMap(s -> issueService.getFromSprint(s.getOriginBoardId().toString(), s.getId().toString()))
	    	.subscribe(issue -> {
		    	LOGGER.info("issue {}",issue);
	    	});
	    }

	    public static void main(String[] args) {
	    	SpringApplication.run(Main.class, args);
	        LOGGER.info(Main.class.getName(), "Service Started...");
	    }
	
}
