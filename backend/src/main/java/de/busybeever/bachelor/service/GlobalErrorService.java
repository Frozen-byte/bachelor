package de.busybeever.bachelor.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class GlobalErrorService {

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
