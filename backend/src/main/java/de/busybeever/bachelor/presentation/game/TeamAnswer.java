package de.busybeever.bachelor.presentation.game;

public class TeamAnswer {
	private int correct;
	private int wrong;
	
	public int getCorrect() {
		return correct;
	}
	public int getWrong() {
		return wrong;
	}
	
	public void incrementCorrect(){
		correct++;
	}
	
	public void incrementWrong() {
		wrong++;
	}
}
