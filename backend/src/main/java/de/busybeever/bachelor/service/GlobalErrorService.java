package de.busybeever.bachelor.service;

import java.util.List;

public interface GlobalErrorService {

	public void appendError(String message);	
	public List<String> getErrors();
	public void clear();
}
