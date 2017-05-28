package fr.aleclerc.banana.utils;

import org.slf4j.Logger;

import io.reactivex.functions.Consumer;

public class RxUtils {

	public static Consumer<? super Throwable>  logError(Logger logger){
		return e -> logger.error("Exception is :",e);
	}
}
