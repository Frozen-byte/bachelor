package de.busybeever.bachelor.data.entity;


import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "mathjax")
public class MathjaxFunctionEntity implements FunctionEntity, Serializable {

	private static final long serialVersionUID = 2116741343430237411L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	
	@NotNull
	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private String code;

	@Column(nullable = true)
	private String description;

	@Column(nullable = true)
	private String params;

	@Column(nullable=true)
	private String constants;
	
	@Column (nullable = false,name="testcode")
	private String testCode;
	
	@Override
	public String getTestCode() {
		return testCode;
	}
	
	public String getName() {
		return name;
	}

	public String getCode() {
		return code;
	}

	public String getDescription() {
		return description;
	}

	public String getParams() {
		return params;
	}
	
	public Integer getId() {
		return id;
	}

	@Override
	public String getConstants() {
		return constants;
	}
	
	public void setConstants(String constants) {
		this.constants = constants;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setParams(String params) {
		this.params = params;
	}
	
	public void setTestCode(String testCode) {
		this.testCode = testCode;
	}
	
	

}
