package de.busybeever.bachelor.service.impl;

import javax.script.Bindings;
import javax.script.ScriptException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import de.busybeever.bachelor.data.entity.ScriptEntity;
import de.busybeever.bachelor.data.enums.FormType;
import de.busybeever.bachelor.data.repository.ScriptRepository;
import de.busybeever.bachelor.javascript.JavaScriptWrapper;
import de.busybeever.bachelor.presentation.client.Assignment;
import de.busybeever.bachelor.presentation.client.Task;
import de.busybeever.bachelor.presentation.generator.StartGeneratorObject;
import de.busybeever.bachelor.presentation.generator.UpdateOverviewObject;
import de.busybeever.bachelor.service.GameStatusService;
import de.busybeever.bachelor.service.GeneratorService;
import de.busybeever.bachelor.service.GlobalErrorService;
import de.busybeever.bachelor.service.ScriptService;
import de.busybeever.bachelor.service.UserDataService;

@Service
public class GeneratorServiceImpl implements GeneratorService {

	private JavaScriptWrapper scriptWrapper;
	private FormType formType;

	@Autowired
	private ScriptService scriptService;

	@Autowired
	private ScriptRepository scriptRepository;

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
		ScriptEntity entity = scriptRepository.findByName(obj.getName());

		if (entity == null) {
			return HttpStatus.NOT_FOUND;
		}

		String script = scriptService.constructScript(entity);
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
		this.formType = entity.getFormType();
		return HttpStatus.OK;
	}

	public boolean stopGenerator() {
		if (scriptWrapper != null) {
			scriptWrapper = null;
			gameStatusService.stop();
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
		return new Task(scriptWrapper.getComputedMathjax(variables), variables, formType, gameStatusService.getEndTime());

	}

	public ResponseEntity<Assignment> validateAnswer(String answer, Integer userId) {
		if (!gameStatusService.isGameRunning()) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		Task task = userDataService.getTask(userId);
		if (task == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			try {
				boolean result = scriptWrapper.validateAnswer(task.getVariables(), answer);
				String team = userDataService.getTeam(userId);
				if (result) {
					gameStatusService.incrementCorrectAnswer(team);

					Task newTask = generateTask();
					userDataService.addTask(userId, newTask);
					return new ResponseEntity<>(new Assignment(newTask.getMathjax(), newTask.getFormType()),
							HttpStatus.OK);
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
