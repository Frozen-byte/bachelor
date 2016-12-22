package de.busybeever.bachelor.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import de.busybeever.bachelor.presentation.client.Task;
import de.busybeever.bachelor.service.UserDataService;

@Service
public class UserDataServiceImpl implements UserDataService {

	private Map<Integer, String> teamMapping = new HashMap<>();
	private Map<Integer, Task> taskMapping = new HashMap<>();
	
	public void addTeamMapping(Integer userId, String team) {
		this.teamMapping.put(userId, team);
	}
	

	public String getTeam(Integer userId) {
		return teamMapping.get(userId);
	}
	
	public void addTask(Integer userId, Task task) {
		taskMapping.put(userId, task);
	}
	
	public Task getTask(Integer userId) {
		return taskMapping.get(userId);
	}
	
	public void resetTasks() {
		this.taskMapping.clear();
	}
}