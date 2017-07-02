package fr.aleclerc.banana.utils;

import org.slf4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.util.concurrent.ListenableFuture;

import io.reactivex.Observable;
import io.reactivex.functions.Consumer;

public class RxUtils {
	
	private RxUtils() {
		
	}

	public static Consumer<? super Throwable>  logError(Logger logger){
		return e -> logger.error("Exception is :",e);
	}
	
	public static <T> Observable<T> fromListenableFuture(ListenableFuture<ResponseEntity<T>> future) {
		return Observable.<T>create(emitter -> {
			future.addCallback(result -> {
				emitter.onNext(result.getBody());
				emitter.onComplete();
			},  emitter::onError);

		});
	}

}
