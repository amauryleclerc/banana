package fr.aleclerc.banana.services.plush;


import fr.aleclerc.banana.domain.plush.PlushState;
import fr.aleclerc.banana.domain.plush.User;
import io.reactivex.Observable;

import java.util.List;

public interface IPlushService {

    void take(User user, String plushId);

    void release(User user, String plushId);

    Observable<PlushState> getStream();

    List<PlushState> getStates();

}
