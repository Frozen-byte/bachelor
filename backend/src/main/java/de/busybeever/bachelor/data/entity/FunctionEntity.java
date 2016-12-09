package de.busybeever.bachelor.data.entity;


public abstract interface FunctionEntity {

	public String getName();
	public String getCode();
	public String getDescription();
	public String getParams();
	public String getConstants();
	public Integer getId();
	
	public void setName(String name);
	public void setCode(String code);
	public void setDescription(String description);
	public void setParams(String params);
	public void setConstants(String constants);
	
	
	
	
	
}
