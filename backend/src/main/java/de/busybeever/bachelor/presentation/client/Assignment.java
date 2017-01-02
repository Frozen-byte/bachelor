package de.busybeever.bachelor.presentation.client;

import de.busybeever.bachelor.data.enums.FormType;

public class Assignment {

	private String mathjax;
	private FormType formType;
	
	public Assignment(String mathjax, FormType formType) {
		this.mathjax = mathjax;
		this.formType = formType;
	}
	
	public FormType getFormType() {
		return formType;
	}
	
	public String getMathjax() {
		return mathjax;
	}
}
