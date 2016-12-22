package de.busybeever.bachelor.service;

import de.busybeever.bachelor.data.entity.FunctionEntity;
import de.busybeever.bachelor.data.entity.ScriptEntity;

public interface ScriptService {

	public String getMathjaxScript();
	public String getVariableScript();
	public String constructScript(ScriptEntity entity);
	public String constructScript(String name);

}
