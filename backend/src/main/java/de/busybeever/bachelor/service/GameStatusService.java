package de.busybeever.bachelor.service;

import java.util.Date;
import java.util.TimerTask;

import org.apache.commons.lang3.time.DateUtils;

import de.busybeever.bachelor.presentation.game.RuntimeInformation;
import de.busybeever.bachelor.presentation.game.TeamAnswer;
import de.busybeever.bachelor.presentation.generator.UpdateOverviewObject;

public interface GameStatusService {

	public UpdateOverviewObject generateUpdate();
	public void incrementCorrectAnswer(String teamName) throws IllegalArgumentException;
	public void incrementWrongAnswer(String teamName) throws IllegalArgumentException;
	public void startNew(int runTime);
	public String[] getTeams();
	public void setTeams(String[] teams);
	public boolean isGameRunning();
	public RuntimeInformation generateRuntimeInformation();
	public Date getEndTime();
}
