package de.busybeever.bachelor.data.entity;


import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;



@Entity
@Table(name="scripts")
public class ScriptEntity implements Serializable{

	private static final long serialVersionUID = -4232125676287964651L;


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
	
	@Override
	public String toString() {
		return "ScriptEntity [id=" + id + ", name=" + name + ", variableScript=" + variableScript + ", solutionScript="
				+ solutionScript + ", mathJaxScript=" + mathjaxScript + "]";
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
	
	

	
	
	
	
	
}
