package fr.aleclerc.banana.services.sync;

import io.reactivex.Completable;
import io.reactivex.Single;

import java.util.UUID;

public interface IImportFromJiraService {

    Single<UUID> importFromJira(String id);
}
