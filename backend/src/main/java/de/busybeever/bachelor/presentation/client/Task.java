package de.busybeever.bachelor.presentation.client;

import javax.script.Bindings;

public class Task {
	
	private String mathjax;
	private Bindings variables;
	
	public Bindings getVariables() {
		return variables;
	}
	
	public String getMathjax() {
		return mathjax;
	}
	
	public Task(String mathjax, Bindings variables) {
		this.mathjax = mathjax;
		this.variables = variables;
	}
}
