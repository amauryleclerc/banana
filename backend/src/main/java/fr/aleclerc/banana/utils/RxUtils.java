package fr.aleclerc.banana.utils;

import fr.aleclerc.banana.jira.app.utils.JiraApiUtils;
import io.reactivex.Completable;
import io.reactivex.Observable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.web.context.request.async.DeferredResult;

import io.reactivex.Single;
import io.reactivex.functions.Consumer;

import java.time.Duration;
import java.time.Instant;

public class RxUtils {

	private static final Logger LOGGER = LoggerFactory.getLogger(RxUtils.class);
	private static final long TIMEOUT = 60_000L;

	private RxUtils() {

	}

	public static Consumer<? super Throwable> logError(Logger logger) {
		return e -> logger.error("Exception is :", e);
	}

	public static <T> Single<T> fromListenableFuture(ListenableFuture<ResponseEntity<T>> future) {
		return Single.<T>create(emitter -> future.addCallback(result -> emitter.onSuccess(result.getBody()), emitter::onError));
	}

	public static <T> DeferredResult<T> toDeferredResult(Single<T> obs, long timeout) {
		DeferredResult<T> deferred = new DeferredResult<>(timeout);
		Instant start = Instant.now();

		obs.doOnError(RxUtils.logError(LOGGER))
				.doOnSuccess(evt -> LOGGER.info("Request success after {} ms", Duration.between(start,Instant.now()).toMillis()))
				.subscribe(deferred::setResult, deferred::setErrorResult);
		deferred.onTimeout(()->LOGGER.error("Request timeout"));
		return deferred;
	}

	public static <T> DeferredResult<T> toDeferredResult(Single<T> obs) {
		return RxUtils.toDeferredResult(obs,TIMEOUT );
	}


}
