package de.busybeever.bachelor.service;

import javax.script.Bindings;
import javax.script.ScriptException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import de.busybeever.bachelor.javascript.JavaScriptWrapper;
import de.busybeever.bachelor.presentation.client.Task;
import de.busybeever.bachelor.presentation.generator.StartGeneratorObject;
import de.busybeever.bachelor.presentation.generator.UpdateOverviewObject;

public interface GeneratorService {

	public HttpStatus startGenerator(StartGeneratorObject obj);
	public boolean stopGenerator();

	public String getRunningGeneratorName();

	public UpdateOverviewObject getStatus();
	public Task generateTask() throws ScriptException;
	public ResponseEntity<String> validateAnswer(String answer, Integer userId);

}
