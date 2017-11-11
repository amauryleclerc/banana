package fr.aleclerc.banana.services.plush;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.aleclerc.banana.domain.plush.IPlushConfig;
import fr.aleclerc.banana.domain.plush.PlushState;
import fr.aleclerc.banana.domain.plush.User;
import io.reactivex.Observable;
import io.reactivex.subjects.PublishSubject;
import io.reactivex.subjects.Subject;

@Service
public class PlushService implements IPlushService {

    private static final Logger LOGGER = LoggerFactory.getLogger(PlushService.class);

    private Map<String, PlushState> plushStates = new HashMap<>();
    private Subject<PlushState> stateSubject = PublishSubject.create();


    @Autowired
    private IPlushConfig plushConfig;

    @PostConstruct
    private void init() {


        LOGGER.info("init Plush : {}", plushConfig);

        plushConfig.getPlushs()//
                .forEach(p -> {
                    PlushState state = new PlushState();
                    state.setPlush(p);
                    plushStates.put(p.getId(), state);
                });

    }

    @Override
    public boolean take(User user, String plushId) {
        PlushState state = plushStates.get(plushId);
        if (state != null && state.getOwner() == null && user.getId() != null) {
            state.setOwner(user);
            stateSubject.onNext(state);
            return true;
        }
        return false;
    }

    @Override
    public boolean release(User user, String plushId) {
        PlushState state = plushStates.get(plushId);
        if (state != null && (user.equals(state.getOwner()) || user.getId().equals("admin"))) {
            state.setOwner(null);
            stateSubject.onNext(state);
            return true;
        }
        return false;
    }

    @Override
    public Observable<PlushState> getStream() {
        return stateSubject.startWith(plushStates.values());
    }

    @Override
    public List<PlushState> getStates() {
        return new ArrayList<PlushState>(plushStates.values());

    }

	@Override
	public Optional<PlushState> getState(String id) {
		return Optional.ofNullable(plushStates.get(id));
	}

}
