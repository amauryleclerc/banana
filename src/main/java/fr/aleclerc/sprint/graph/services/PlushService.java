package fr.aleclerc.sprint.graph.services;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import fr.aleclerc.sprint.graph.domain.plush.PlushConfig;
import fr.aleclerc.sprint.graph.domain.plush.PlushState;
import fr.aleclerc.sprint.graph.domain.plush.User;
import io.reactivex.Observable;
import io.reactivex.subjects.PublishSubject;
import io.reactivex.subjects.Subject;

@Service
public class PlushService {

	private final Logger LOGGER = LoggerFactory.getLogger(PlushService.class);

	private Map<String, PlushState> plushStates = new HashMap<>();
	private Subject<PlushState> stateSubject =  PublishSubject.create();
	
	@PostConstruct
	private void init() throws JsonParseException, JsonMappingException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		URL url = this.getClass().getResource("/plush-config.json");
		File file = new File(url.getPath());
		PlushConfig config = mapper.readValue(file, PlushConfig.class);

		LOGGER.info("init Plush : {}", config);
		
		config.getPlushs().forEach(p -> {
			PlushState state = new PlushState();
			state.setPlush(p);
			plushStates.put(p.getId(), state);
		});
	}

	public void take(User user, String  plushId){
		PlushState state = plushStates.get(plushId);
		if(state != null && state.getOwner() == null){
			state.setOwner(user);
			stateSubject.onNext(state);
		}
	}
	public void release(User user, String plushId){
		PlushState state = plushStates.get(plushId);
		if(state != null && ( user.equals(state.getOwner()) || user.getId().equals("admin"))){
			state.setOwner(null);
			stateSubject.onNext(state);
		}
	}
	
	public Observable<PlushState> getStream(){
		return stateSubject.startWith(plushStates.values());
	}
	public List<PlushState> getStates(){
		return new ArrayList<PlushState>(plushStates.values());
		
	}
	
}
