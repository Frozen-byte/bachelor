package de.busybeever.bachelor.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import de.busybeever.bachelor.data.entity.FunctionEntity;
import de.busybeever.bachelor.data.entity.ScriptEntity;
import de.busybeever.bachelor.data.repository.MathjaxFunctionRepository;
import de.busybeever.bachelor.data.repository.VariableFunctionRepository;
import de.busybeever.bachelor.service.ValidationService;
import de.busybeever.bachelor.service.GlobalErrorService;

@Service
public class ValidationServiceImpl implements ValidationService {

	
	@Autowired
	private MathjaxFunctionRepository mathjaxRepo;
	
	@Autowired
	private VariableFunctionRepository variableRepo;
	
	@Value("${validation.allowed}")
	private String[] allowedBasicFunctions;
	
	@Autowired
	private GlobalErrorService globalErrorService;
	
	@Override
	public String[] getAllowedMethods() {

		
		return allowedMethods().toArray(new String[0]);
	}
	
	private List<String>allowedMethods() {
		List<String> allowedMethods = new ArrayList<>();

		addMethodsToList(mathjaxRepo.findAll(), "mj", allowedMethods);
		addMethodsToList(variableRepo.findAll(), "vf", allowedMethods);
		for (String string : allowedBasicFunctions) {
			allowedMethods.add(string);
		}
		return allowedMethods;
	}
	
	private static final Pattern pattern = Pattern.compile("([\\.a-zA-Z]*)\\(.*\\)");
	
	@Override
	public boolean containsNotAllowedFunctions(FunctionEntity entity) {
		return validateScript(entity.getCode(), "Helper-Funktion", entity.getId());
	}
	
	@Override
	public boolean containsNotAllowedFunctions(ScriptEntity entity) {
		
		return validateScript(entity.getMathjaxScript(), "Skript", entity.getId()) &
				validateScript(entity.getSolutionScript(), "Skript", entity.getId()) &
				validateScript(entity.getVariableScript(), "Skript", entity.getId());
		
	}
	
	private boolean validateScript(String script, String type, Integer id) {
		List<String> allowed = allowedMethods();
		Matcher matcher = pattern.matcher(script);
		boolean failure = false;
		while(matcher.find()) {
			String group = matcher.group(1);
			if(!allowed.contains(group)) {
				if(!failure) {
					globalErrorService.appendError("Fehler bei der Validierung von "+ type + " mit der ID "+ id +" entdeckt.");
				}
				globalErrorService.appendError("Funktion mit Namen: "+group+" ist nicht erlaubt.");
				failure = true;
			}
		}
		if(failure) {
			globalErrorService.appendError("-------------");
		}
		return failure;
	}
	
	
	private void addMethodsToList(List<? extends FunctionEntity>methods, String prefix, List<String> list ) {
		
		for (FunctionEntity entity : methods) {
			list.add(prefix+"."+entity.getName());
		}
		
	}
}
