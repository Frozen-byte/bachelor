package de.busybeever.bachelor.presentation.client;

import javax.validation.constraints.NotNull;

public class SelectTeamObject {

	@NotNull
	private String team;
	
	public String getTeam() {
		return team;
	}
	
	public void setTeam(String team) {
		this.team = team;
	}
}
