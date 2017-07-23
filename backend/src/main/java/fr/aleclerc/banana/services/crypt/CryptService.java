package fr.aleclerc.banana.services.crypt;


import org.jasypt.util.text.BasicTextEncryptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.inject.Singleton;

@Service
@Singleton
public class CryptService implements ICryptService {
    private static final Logger LOGGER = LoggerFactory.getLogger(CryptService.class);

    private static final String KEY = "BANANA";

    private BasicTextEncryptor textEncryptor;

    public CryptService() {
        textEncryptor = new BasicTextEncryptor();
        textEncryptor.setPassword(KEY);
    }

    @Override
    public String encrypt(String strClearText) {
        return textEncryptor.encrypt(strClearText);
    }

    @Override
    public String decrypt(String strEncrypted) {
        return textEncryptor.decrypt(strEncrypted);
    }

}
