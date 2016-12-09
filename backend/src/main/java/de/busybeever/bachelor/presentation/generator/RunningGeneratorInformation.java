package de.busybeever.bachelor.presentation.generator;

import java.util.Date;

public class RunningGeneratorInformation {

	private Date endTime;
	private int runTime;
	private String name;
	
	public RunningGeneratorInformation(Date endTime, int runTime, String name) {
		this.endTime = endTime;
		this.runTime = runTime;
		this.name = name;
	}
	
	public Date getEndTime() {
		return endTime;
	}
	
	public String getName() {
		return name;
	}
	
	public int getRunTime() {
		return runTime;
	}
	
	
}
