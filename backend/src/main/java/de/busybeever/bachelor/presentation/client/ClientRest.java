package de.busybeever.bachelor.presentation.client;

import javax.script.ScriptException;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import de.busybeever.bachelor.data.enums.FormType;
import de.busybeever.bachelor.service.GameStatusService;
import de.busybeever.bachelor.service.GeneratorService;
import de.busybeever.bachelor.service.GlobalErrorService;
import de.busybeever.bachelor.service.UserDataService;

@RestController
@RequestMapping("client")
public class ClientRest {

	@Autowired
	private GeneratorService generatorService;
	
	@Autowired
	private UserDataService userDataService;
	
	@Autowired
	private GameStatusService gameStatusService;
	
	@Autowired
	private GlobalErrorService globalErrorService;
	
	
	@GetMapping("teams")
	public String[] getTeams() {
		return gameStatusService.getTeams();
	}
	
	
	@PostMapping("login")
	public ResponseEntity<String> login(HttpServletRequest request, @RequestBody @Valid SelectTeamObject obj) {
		Integer userId = (Integer) request.getSession().getAttribute("id");
		userDataService.addTeamMapping(userId, obj.getTeam());
		return new ResponseEntity<String>("ok", HttpStatus.OK);
	}
	
	@GetMapping("task")
	public ResponseEntity<Assignment> getTask(HttpServletRequest request) {
		Integer userId = (Integer) request.getSession().getAttribute("id");
		//Mb make this whole stuff a service method to keep controller clean
		if(gameStatusService.isGameRunning()) {
			Task task = userDataService.getTask(userId);
			
			if(task==null) {
				try {
					task = generatorService.generateTask();
				} catch (ScriptException e) {
					globalErrorService.appendError(e.getMessage());
					e.printStackTrace();
				}
				userDataService.addTask(userId, task);
			}
			return new ResponseEntity<Assignment>(new Assignment(task.getMathjax(), task.getFormType()), HttpStatus.OK);
		}else {
			//Generator is null => no task running right now
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			
		}
	}
	
	@PostMapping("task")
	public ResponseEntity<Assignment> postTask(@RequestParam("solution") String solution, HttpServletRequest request) {
		Integer userId = (Integer) request.getSession().getAttribute("id");
		return generatorService.validateAnswer(solution, userId);
		
	}
}
