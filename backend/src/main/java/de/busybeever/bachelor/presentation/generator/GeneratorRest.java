package de.busybeever.bachelor.presentation.generator;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.busybeever.bachelor.data.entity.ScriptEntity;
import de.busybeever.bachelor.data.repository.ScriptRepository;
import de.busybeever.bachelor.presentation.game.RuntimeInformation;
import de.busybeever.bachelor.service.GameStatusService;
import de.busybeever.bachelor.service.GeneratorService;

@RestController
@RequestMapping("generator")
@PreAuthorize("hasAuthority('GENERATOR')")
public class GeneratorRest {

	@Autowired
	private GeneratorService generatorService;
	
	@Autowired
	private GameStatusService gameStatusService;

	@Autowired
	private ScriptRepository scriptRepository;
	
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
	
	@GetMapping("/generators")
	public String[] getGeneratorNames() {
		List<ScriptEntity> entites = scriptRepository.findAll();
		String[] res = new String[entites.size()];
		for (int i = 0; i < res.length; i++) {
			res[i] = entites.get(i).getName();
		}
		return res;
	}

	@PostMapping("start")
	public ResponseEntity<?> startGenerator(@RequestBody StartGeneratorObject obj) {
		return new ResponseEntity<String>(generatorService.startGenerator(obj));
	}

	@GetMapping("status")
	public UpdateOverviewObject getStatus() {
		return generatorService.getStatus();
	}
	
	@GetMapping("runtime")
	public RuntimeInformation getRuntime() {
		return gameStatusService.generateRuntimeInformation();
	}
	
	@PostMapping("names")
	public void changeTeamNames(@RequestBody String[] names) {
		gameStatusService.setTeams(names);
	}

}
