package fr.aleclerc.banana.controllers;

import fr.aleclerc.banana.services.crypt.CryptService;
import fr.aleclerc.banana.services.crypt.ICryptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;

@RestController
@RequestMapping(value = "/api")
public class EncryptController {

    private final ICryptService service;

    @Autowired
    public EncryptController(ICryptService service) {
        this.service = service;
    }

    @RequestMapping(value = "/encrypt/{str}", method = RequestMethod.GET)
    public String encrypt(@PathVariable("str") String str) {
        return service.encrypt(str);
    }

    @RequestMapping(value = "/decrypt/{str}", method = RequestMethod.GET)
    public String decrypt(@PathVariable("str") String str) {
        return service.decrypt(str);
    }

}
