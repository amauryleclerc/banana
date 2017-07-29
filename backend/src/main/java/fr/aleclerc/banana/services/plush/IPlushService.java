package fr.aleclerc.banana.services.plush;


import fr.aleclerc.banana.domain.plush.PlushState;
import fr.aleclerc.banana.domain.plush.User;
import io.reactivex.Observable;

import java.util.List;
import java.util.Optional;

public interface IPlushService {

    boolean take(User user, String plushId);

    boolean release(User user, String plushId);

    Observable<PlushState> getStream();

    List<PlushState> getStates();
    
    Optional<PlushState> getState(String id);


}
