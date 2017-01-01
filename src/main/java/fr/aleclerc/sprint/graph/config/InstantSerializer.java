package fr.aleclerc.sprint.graph.config;

import java.io.IOException;
import java.time.Instant;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class InstantSerializer extends JsonSerializer<Instant>{

	@Override
	public void serialize(Instant value, JsonGenerator gen, SerializerProvider serializers)
			throws IOException, JsonProcessingException {
		com.fasterxml.jackson.datatype.jsr310.ser.InstantSerializer.INSTANCE.serialize(value,gen, serializers);
	}

}
