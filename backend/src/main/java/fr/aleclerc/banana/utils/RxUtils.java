package fr.aleclerc.banana.utils;

import org.slf4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.web.context.request.async.DeferredResult;

import io.reactivex.Single;
import io.reactivex.functions.Consumer;

public class RxUtils {

	private RxUtils() {

	}

	public static Consumer<? super Throwable> logError(Logger logger) {
		return e -> logger.error("Exception is :", e);
	}

	public static <T> Single<T> fromListenableFuture(ListenableFuture<ResponseEntity<T>> future) {
		return Single.<T>create(emitter -> future.addCallback(result -> emitter.onSuccess(result.getBody()), emitter::onError));
	}

	public static <T> DeferredResult<T> toDeferredResult(Single<T> obs) {
		DeferredResult<T> deffered = new DeferredResult<>();
		obs.subscribe(deffered::setResult, deffered::setErrorResult);
		return deffered;
	}

}
