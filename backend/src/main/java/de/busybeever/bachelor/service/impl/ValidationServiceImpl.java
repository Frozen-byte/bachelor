package de.busybeever.bachelor.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import de.busybeever.bachelor.data.entity.FunctionEntity;
import de.busybeever.bachelor.data.entity.MathjaxFunctionEntity;
import de.busybeever.bachelor.data.repository.MathjaxFunctionRepository;
import de.busybeever.bachelor.data.repository.VariableFunctionRepository;
import de.busybeever.bachelor.service.ValidationService;

@Service
public class ValidationServiceImpl implements ValidationService {

	
	@Autowired
	private MathjaxFunctionRepository mathjaxRepo;
	
	@Autowired
	private VariableFunctionRepository variableRepo;
	
	@Value("${validation.allowed}")
	private String[] allowedBasicFunctions;
	
	@Override
	public String[] getAllowedMethods() {
		
		List<String> allowedMethods = new ArrayList<>();

		addMethodsToList(mathjaxRepo.findAll(), "mj", allowedMethods);
		addMethodsToList(variableRepo.findAll(), "vf", allowedMethods);
		for (String string : allowedBasicFunctions) {
			allowedMethods.add(string);
		}
		
		return allowedMethods.toArray(new String[0]);
	}
	
	
	private void addMethodsToList(List<? extends FunctionEntity>methods, String prefix, List<String> list ) {
		
		for (FunctionEntity entity : methods) {
			list.add(prefix+"."+entity.getName());
		}
		
		
	}
}
