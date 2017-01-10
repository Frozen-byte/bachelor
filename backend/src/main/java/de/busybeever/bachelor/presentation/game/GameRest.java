package de.busybeever.bachelor.presentation.game;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.busybeever.bachelor.service.GameStatusService;

@RestController
@RequestMapping("game")
@PreAuthorize("hasAuthority('GAME')")
public class GameRest {
	
	
	@Autowired
	private GameStatusService gameStatusService;
	
	@GetMapping("runtime")
	public RuntimeInformation getRuntime() {
		return gameStatusService.generateRuntimeInformation();
	}
	
	@PostMapping("names")
	public ResponseEntity<?> changeTeamNames(@RequestBody String[] names) {
		gameStatusService.setTeams(names);
		return ResponseEntity.ok().build();
	}

}
