package de.busybeever.bachelor.service;

import java.util.Date;
import java.util.TimerTask;

public interface SchedulerService {

	public void scheduleTask(Date date,TimerTask task);
}
