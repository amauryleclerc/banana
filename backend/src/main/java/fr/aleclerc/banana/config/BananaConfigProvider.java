package fr.aleclerc.banana.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.aleclerc.banana.services.crypt.ICryptService;
import fr.aleclerc.banana.services.plush.PlushService;
import org.jasypt.exceptions.EncryptionOperationNotPossibleException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

@Configuration
public class BananaConfigProvider {


    private final Logger LOGGER = LoggerFactory.getLogger(BananaConfigProvider.class);

    private static final String CONFIG_KEY = "BANANA_CONFIG_FILE";

    private static final String DEFAULT_CONFIG = "banana-config.json";
    private final ICryptService cryptService;

    @Autowired
    public BananaConfigProvider(ICryptService cryptService) {
        this.cryptService = cryptService;
    }

    @Bean
    public BananaConfig provideBananaConfig() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        String configEnv = System.getenv(CONFIG_KEY);
        BananaConfig config = null;
        if (configEnv != null) {
            File input = new File(configEnv);
            config = mapper.readValue(input, BananaConfig.class);

        } else {
            InputStream input = this.getClass().getClassLoader().getResourceAsStream(DEFAULT_CONFIG);
            config = mapper.readValue(input, BananaConfig.class);
        }
        if (config.getPassword() != null){
            try {
                config.setJiraPassword(cryptService.decrypt(config.getPassword()));
            } catch (EncryptionOperationNotPossibleException e){
                LOGGER.error("Decript fail", e);
            }
        }
        return config;
    }


}
