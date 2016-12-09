package de.busybeever.bachelor.presentation.generator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.busybeever.bachelor.service.GeneratorService;

@RestController
@RequestMapping("generator")

public class GeneratorRest {

	@Autowired
	private GeneratorService generatorService;

	@GetMapping("running")
	public String getRunningGenerator() {
		return generatorService.getRunningGeneratorName();
	}

	@PostMapping("stop")
	public ResponseEntity<?> stopRunningGenerator() {
		if (generatorService.stopGenerator()) {
			return new ResponseEntity<String>(HttpStatus.OK);
		} else {
			return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("start")
	public ResponseEntity<?> startGenerator(@RequestBody StartGeneratorObject obj) {
		System.out.println(obj.getTime());
		System.out.println(obj.getName());
		return new ResponseEntity<String>(generatorService.startGenerator(obj));
	}

	@GetMapping("status")
	public UpdateOverviewObject getStatus() {
		return generatorService.getStatus();
	}

}
