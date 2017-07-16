package fr.aleclerc.banana.config;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;

@Configuration
public class BananaConfigProvider {

	private static final String  CONFIG_KEY = "BANANA_CONFIG_FILE";
	
	private static final String  DEFAULT_CONFIG = "banana-config.json";
	@Bean
	public BananaConfig provideBananaConfig() throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		String configEnv = System.getenv(CONFIG_KEY);
		if(configEnv != null) {
			File input = new File(configEnv);
			return mapper.readValue(input, BananaConfig.class);
			
		}
		InputStream input = this.getClass().getClassLoader().getResourceAsStream(DEFAULT_CONFIG);
		return mapper.readValue(input, BananaConfig.class);
	}



}
