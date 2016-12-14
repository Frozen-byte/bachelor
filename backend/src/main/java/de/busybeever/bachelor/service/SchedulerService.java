package de.busybeever.bachelor.service;

import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;

import org.springframework.stereotype.Service;


@Service
public class SchedulerService {

	
	private Timer timer = new Timer();
	
	public void scheduleTask(Date date,TimerTask task) {
		timer.schedule(task, date);
	}

	
}
