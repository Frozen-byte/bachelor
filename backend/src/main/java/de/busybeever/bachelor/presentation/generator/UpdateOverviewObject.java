package de.busybeever.bachelor.presentation.generator;

import java.util.Map;

import de.busybeever.bachelor.presentation.game.TeamAnswer;

public class UpdateOverviewObject {

	private Map<String, TeamAnswer> answers;
	
	public UpdateOverviewObject(Map<String, TeamAnswer> answers) {
		this.answers = answers;
	}
	
	public UpdateOverviewObject() {
		
	}
	
	public Map<String, TeamAnswer> getAnswers() {
		return answers;
	}
	
	
	
	
	
	
}
