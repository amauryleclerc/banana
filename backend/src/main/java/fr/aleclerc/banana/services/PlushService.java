package fr.aleclerc.banana.services;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
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

import fr.aleclerc.banana.domain.plush.PlushConfig;
import fr.aleclerc.banana.domain.plush.PlushState;
import fr.aleclerc.banana.domain.plush.User;
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
		InputStream input  = this.getClass().getClassLoader().getResourceAsStream("plush-config.json");

		PlushConfig config = mapper.readValue(input, PlushConfig.class);

		LOGGER.info("init Plush : {}", config);
		
		config.getPlushs()//
		.stream()//
		.map(p ->{
			p.setImg("http://127.0.0.1:9000/"+p.getImg());
			return p;
		})//
		.forEach(p -> {
			PlushState state = new PlushState();
			state.setPlush(p);
			plushStates.put(p.getId(), state);
		});
	}

	public void take(User user, String  plushId){
		PlushState state = plushStates.get(plushId);
		if(state != null && state.getOwner() == null && user.getId() != null){
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
