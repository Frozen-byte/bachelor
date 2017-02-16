package de.busybeever.bachelor.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.TimerTask;

import org.apache.commons.lang.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.busybeever.bachelor.presentation.game.RuntimeInformation;
import de.busybeever.bachelor.presentation.game.TeamAnswer;
import de.busybeever.bachelor.presentation.generator.UpdateOverviewObject;
import de.busybeever.bachelor.service.GameStatusService;
import de.busybeever.bachelor.service.GeneratorService;
import de.busybeever.bachelor.service.SchedulerService;
import de.busybeever.bachelor.websockets.AdminNamespace;

@Service
public class GameStatusServiceImpl implements GameStatusService{

	
	@Autowired
	private SchedulerService scheduler;
	
	@Autowired
	private GeneratorService generatorService;
	
	@Autowired
	private AdminNamespace adminNamespace;
	
	private String[] teams = { "Team Eins", "Team Zwei" };

	private Map<String, TeamAnswer> teamMapping = new HashMap<String, TeamAnswer>();

	private boolean gameRunning;

	private Date endTime;
	private int runTime;
	
	private TimerTask timer;

	public UpdateOverviewObject generateUpdate() {
		if(!gameRunning) {
			return null;
		} else {
			return new UpdateOverviewObject(teamMapping);
		}
		
		
	}

	public void incrementCorrectAnswer(String teamName) throws IllegalArgumentException {
		teamMapping.keySet().forEach(System.out::println);
		if (teamMapping.containsKey(teamName)) {
			teamMapping.get(teamName).incrementCorrect();
		} else {
			throw new IllegalArgumentException();
		}
	}

	public void incrementWrongAnswer(String teamName) throws IllegalArgumentException {

		if (teamMapping.containsKey(teamName)) {
			teamMapping.get(teamName).incrementWrong();
		} else {
			throw new IllegalArgumentException();
		}
	}
	
	

	public void startNew(int runTime) {
		if(timer!=null) {
			timer.cancel();
			timer=null;
		}
		gameRunning=true;

		endTime = DateUtils.addSeconds(new Date(), runTime);
		timer = new TimerTask() {		
			@Override
			public void run() {
				gameRunning = false;
				generatorService.stopGenerator();
				adminNamespace.informAboutEnd();
			}
		};
		scheduler.scheduleTask(endTime,timer);
		for (int i = 0; i < teams.length; i++) {
			teamMapping.put(teams[i], new TeamAnswer());
		}
		this.runTime = runTime;
	}
	
	@Override
	public void stop() {
		if(gameRunning) {
			timer.cancel();
			timer=null;
			gameRunning = false;
		}
	}

	public String[] getTeams() {
		return teams;
	}

	public void setTeams(String[] teams) {
		this.teams = teams;
	}
	
	public boolean isGameRunning() {
		return gameRunning;
	}
	
	public RuntimeInformation generateRuntimeInformation() {
		return new RuntimeInformation(endTime, runTime);
	}
	
	@Override
	public Date getEndTime() {
		return endTime;
	}

}
