package de.busybeever.bachelor.presentation.client;

import java.util.Date;

import javax.script.Bindings;

import de.busybeever.bachelor.data.enums.FormType;

public class Task {
	
	private String mathjax;
	private Bindings variables;
	private FormType formType;
	private Date endDate;
	
	public Bindings getVariables() {
		return variables;
	}
	
	public String getMathjax() {
		return mathjax;
	}
	
	public Task(String mathjax, Bindings variables, FormType formType, Date endDate) {
		this.mathjax = mathjax;
		this.variables = variables;
		this.formType = formType;
		this.endDate = endDate;
	}
	
	public FormType getFormType() {
		return formType;
	}
	
	public Date getEndDate() {
		return endDate;
	}
}
