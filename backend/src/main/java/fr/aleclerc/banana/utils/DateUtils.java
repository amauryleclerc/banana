package fr.aleclerc.banana.utils;

import java.time.ZonedDateTime;

public class DateUtils {
	
	private DateUtils() {
		
	}

	public static ZonedDateTime getZonedDateTime(String input) {
		if(input == null) {
			return null;
		}
		return ZonedDateTime.parse(input.substring(0, input.indexOf('+')) + "Z");
	}

}
