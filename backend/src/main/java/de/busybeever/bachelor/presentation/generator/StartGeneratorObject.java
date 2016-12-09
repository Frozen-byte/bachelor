package de.busybeever.bachelor.presentation.generator;

import javax.validation.constraints.NotNull;

public class StartGeneratorObject {

	@NotNull
	private Integer time;
	
	@NotNull
	private String name;
	
	
	public Integer getTime() {
		return time;
	}
	public String getName() {
		return name;
	}
}
