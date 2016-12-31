package de.busybeever.bachelor.data.entity;


import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.aspectj.util.GenericSignature.FormalTypeParameter;

import de.busybeever.bachelor.data.enums.FormType;



@Entity
@Table(name="scripts")
public class ScriptEntity implements Serializable{

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Integer id;
	
	@Column(nullable=false, name="name")
	private String name;
	
	@Column(nullable=false, name="variablescript")
	private String variableScript;
	
	@Column(nullable=false, name="solutionscript")
	private String solutionScript;

	@Column(nullable=false, name="mathjaxscript")
	private String mathjaxScript;
	
	@Enumerated
	@Column(nullable=false, name="formtype")
	private FormType formType;
	
	public ScriptEntity(){}

	public ScriptEntity(Integer id, String name, String variableScript, String solutionScript, String mathJaxScript) {
		this.id = id;
		this.name = name;
		this.variableScript = variableScript;
		this.solutionScript = solutionScript;
		this.mathjaxScript = mathJaxScript;
	};
	
	public Integer getId() {
		return id;
	}
	
	public String getMathjaxScript() {
		return mathjaxScript;
	}
	
	public String getName() {
		return name;
	}
	
	public String getSolutionScript() {
		return solutionScript;
	}
	
	public String getVariableScript() {
		return variableScript;
	}
	
	public FormType getFormType() {
		return formType;
	}

	@Override
	public String toString() {
		return "ScriptEntity [id=" + id + ", name=" + name + ", variableScript=" + variableScript + ", solutionScript="
				+ solutionScript + ", mathjaxScript=" + mathjaxScript + ", formType=" + formType + "]";
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setVariableScript(String variableScript) {
		this.variableScript = variableScript;
	}

	public void setSolutionScript(String solutionScript) {
		this.solutionScript = solutionScript;
	}

	public void setMathjaxScript(String mathjaxScript) {
		this.mathjaxScript = mathjaxScript;
	}
	
	public void setFormType(FormType formType) {
		this.formType = formType;
	}
	
	

	
	
	
	
	
}
