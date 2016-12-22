package de.busybeever.bachelor.service.impl;

import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ScheduledExecutorService;

import org.springframework.stereotype.Service;

import de.busybeever.bachelor.service.SchedulerService;


@Service
public class SchedulerServiceImpl implements SchedulerService{

	
	private Timer timer = new Timer();
	
	public void scheduleTask(Date date,TimerTask task) {
		timer.schedule(task, date);
	}

	
}
