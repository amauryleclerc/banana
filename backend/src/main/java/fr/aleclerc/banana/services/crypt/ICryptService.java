package fr.aleclerc.banana.services.crypt;

public interface ICryptService {

     String encrypt(String strClearText);


     String decrypt(String strEncrypted);

}
