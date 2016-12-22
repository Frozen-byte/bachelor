package de.busybeever.bachelor.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import de.busybeever.bachelor.service.GlobalErrorService;

@Service
public class GlobalErrorServiceImpl implements GlobalErrorService {

	private List<String> errors = new ArrayList<>();
	
	{
		errors.add("TestError 1");
		errors.add("TestError 2");
	}
	
	public void appendError(String message) {
		errors.add(message);
	}
	
	public List<String> getErrors() {
		return errors;
	}
}
