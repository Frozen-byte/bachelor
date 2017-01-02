package de.busybeever.bachelor.presentation.client;

import javax.script.Bindings;

import de.busybeever.bachelor.data.enums.FormType;

public class Task {
	
	private String mathjax;
	private Bindings variables;
	private FormType formType;
	
	public Bindings getVariables() {
		return variables;
	}
	
	public String getMathjax() {
		return mathjax;
	}
	
	public Task(String mathjax, Bindings variables, FormType formType) {
		this.mathjax = mathjax;
		this.variables = variables;
		this.formType = formType;
	}
	
	public FormType getFormType() {
		return formType;
	}
}
