package de.busybeever.bachelor.service;

import javax.script.Bindings;
import javax.script.ScriptException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import de.busybeever.bachelor.javascript.JavaScriptWrapper;
import de.busybeever.bachelor.presentation.client.Task;
import de.busybeever.bachelor.presentation.generator.StartGeneratorObject;
import de.busybeever.bachelor.presentation.generator.UpdateOverviewObject;

@Service
public class GeneratorService {

	private JavaScriptWrapper scriptWrapper;

	@Autowired
	private ScriptService scriptService;

	@Autowired
	private UserDataService userDataService;

	@Autowired
	private GameStatusService gameStatusService;

	@Autowired
	private GlobalErrorService globalErrorService;

	public HttpStatus startGenerator(StartGeneratorObject obj) {
		if (scriptWrapper != null) {
			return HttpStatus.BAD_REQUEST;
		}

		String script = scriptService.constructScript(obj.getName());
		if (script == null) {
			return HttpStatus.NOT_FOUND;
		}

		try {
			scriptWrapper = new JavaScriptWrapper(obj.getName(), script, scriptService.getVariableScript(),
					scriptService.getMathjaxScript());
			gameStatusService.startNew(obj.getTime());
			userDataService.resetTasks();
		} catch (ScriptException e) {
			e.printStackTrace();
			globalErrorService.appendError(e.getMessage());
			return HttpStatus.INTERNAL_SERVER_ERROR;

		}
		return HttpStatus.OK;
	}

	public boolean stopGenerator() {
		if (scriptWrapper != null) {
			scriptWrapper = null;
			return true;
		}
		return false;
	}

	public String getRunningGeneratorName() {
		if (this.scriptWrapper == null)
			return null;
		return scriptWrapper.getName();
	}

	public UpdateOverviewObject getStatus() {
		return gameStatusService.generateUpdate();
	}

	public Task generateTask() throws ScriptException {
		Bindings variables;

		variables = scriptWrapper.generateVariables();
		return new Task(scriptWrapper.getComputedMathjax(variables), variables);

	}

	public ResponseEntity<String> validateAnswer(String answer, Integer userId) {

		Task task = userDataService.getTask(userId);
		if (task == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			try {
				boolean result = scriptWrapper.validateAnswer(task.getVariables(), answer);
				String team = userDataService.getTeam(userId);
				System.out.println(userId + " uid");
				if (result) {
					gameStatusService.incrementCorrectAnswer(team);

					Task newTask = generateTask();
					userDataService.addTask(userId, newTask);
					return new ResponseEntity<>(newTask.getMathjax(), HttpStatus.OK);
				} else {
					gameStatusService.incrementWrongAnswer(team);
					return new ResponseEntity<>(HttpStatus.OK);
				}
			} catch (ScriptException e) {
				e.printStackTrace(); 
				globalErrorService.appendError(e.getMessage());
		
				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			} catch (IllegalArgumentException e) {
				e.printStackTrace();
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}

	}

}
