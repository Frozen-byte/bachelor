package de.busybeever.bachelor.presentation.game;

import java.util.Date;

public class RuntimeInformation {

	private Date endDate;
	private int runTime;
	
	public RuntimeInformation(Date endDate, int runTime) {
		this.endDate = endDate;
		this.runTime = runTime;
	}
	
	public Date getEndDate() {
		return endDate;
	}
	
	public int getRunTime() {
		return runTime;
	}
	
	
}
