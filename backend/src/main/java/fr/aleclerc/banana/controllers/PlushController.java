package fr.aleclerc.banana.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fr.aleclerc.banana.domain.plush.PlushState;
import fr.aleclerc.banana.domain.plush.User;
import fr.aleclerc.banana.services.plush.IPlushService;

@RestController
@RequestMapping("/api/plush/{id}")
public class PlushController {

	private final IPlushService service;

	@Autowired
	public PlushController(IPlushService service) {
		this.service = service;
	}

	@RequestMapping(value = "/take/{key}", method = RequestMethod.POST)
	public ResponseEntity<Boolean> take(@PathVariable("id") String id, @PathVariable("key") String key) {
		User user = new User();
		user.setId(key);
		user.setName(key);
		boolean result = service.take(user, id);
		if (result) {
			return new ResponseEntity<>(HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	}

	@RequestMapping(value = "/release/{key}", method = RequestMethod.POST)
	public ResponseEntity<Boolean> release(@PathVariable("id") String id, @PathVariable("key") String key) {
		User user = new User();
		user.setId(key);
		user.setName(key);
		boolean result = service.release(user, id);
		if (result) {
			return new ResponseEntity<>(HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	}

	@RequestMapping(value = "/status", method = RequestMethod.GET)
	public ResponseEntity<PlushState> status(@PathVariable("id") String id) {
		return service.getState(id)//
				.map(plush -> new ResponseEntity<>(plush, HttpStatus.OK))//
				.orElse(new ResponseEntity<>(HttpStatus.NO_CONTENT));

	}

}
