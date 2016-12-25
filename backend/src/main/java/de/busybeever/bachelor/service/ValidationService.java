package de.busybeever.bachelor.service;

import de.busybeever.bachelor.data.entity.FunctionEntity;
import de.busybeever.bachelor.data.entity.ScriptEntity;

public interface ValidationService {

	public String[] getAllowedMethods();
	public boolean containsNotAllowedFunctions(FunctionEntity entity);
	public boolean containsNotAllowedFunctions(ScriptEntity entity);
}
