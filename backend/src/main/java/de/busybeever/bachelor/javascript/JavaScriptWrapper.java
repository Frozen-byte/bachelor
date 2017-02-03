package de.busybeever.bachelor.javascript;

import java.io.File;
import java.io.IOException;
import java.util.Scanner;

import javax.script.Bindings;
import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

public class JavaScriptWrapper {

	private ScriptEngine engine;
	private Invocable invocable;
	
	private final String name;
	
	private static final String mathjs = getMathjs();

	public JavaScriptWrapper(String name, String generatorScript, String variableScript, String mathjaxScript) throws ScriptException {
		engine = new ScriptEngineManager().getEngineByName("nashorn");
		engine.eval(variableScript+"\n"+mathjaxScript+"\n"+generatorScript+"\n");
		this.invocable = (Invocable) engine;
		this.name = name;

	}

	public Bindings generateVariables() throws ScriptException {
		try {
			return (Bindings) invocable.invokeFunction("generateVariables");
		} catch (NoSuchMethodException e) {
			throw new RuntimeException(e);
		}
	}

	public String getComputedMathjax(Bindings variables) throws ScriptException {
		try {
			return (String) invocable.invokeFunction("getComputedMathjax", variables);
		} catch (NoSuchMethodException e) {
			throw new RuntimeException(e);
		}
	}

	public boolean validateAnswer(Bindings variables, String answer) throws ScriptException {
		try {
			return (boolean) invocable.invokeFunction("testSolution", variables, answer);
		} catch (NoSuchMethodException e) {
			throw new RuntimeException(e);
		}
	}

	public String getName() {
		return name;
	}
	
	private static String getMathjs(){
		ClassLoader loader = JavaScriptWrapper.class.getClassLoader();
		File file = new File(loader.getResource("static/math.js").getFile());
		StringBuilder result = new StringBuilder();
		try(Scanner scanner = new Scanner(file)) {
			while(scanner.hasNextLine()) {
				result.append(scanner.nextLine()).append("\n");
			}
			scanner.close();
			return result.toString();
		} catch(IOException e) {
			e.printStackTrace();
			System.exit(-1);
		}
		throw new RuntimeException();
	}
}
