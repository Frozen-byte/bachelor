package de.busybeever.bachelor.service;

import de.busybeever.bachelor.presentation.client.Task;

public interface UserDataService {

	public void addTeamMapping(Integer userId, String team);

	public String getTeam(Integer userId);
	public void addTask(Integer userId, Task task);
	public Task getTask(Integer userId);
	
	public void resetTasks();
}
