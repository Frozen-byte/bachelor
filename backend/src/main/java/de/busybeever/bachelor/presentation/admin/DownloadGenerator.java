package de.busybeever.bachelor.presentation.admin;

import de.busybeever.bachelor.data.entity.FunctionEntity;
import de.busybeever.bachelor.data.entity.MathjaxFunctionEntity;
import de.busybeever.bachelor.data.entity.ScriptEntity;
import de.busybeever.bachelor.data.entity.VariableFunctionEntity;

public class DownloadGenerator {

	private ScriptEntity[] entity;
	private MathjaxFunctionEntity[] mj ;
	private VariableFunctionEntity[] vf;
	
	public DownloadGenerator(ScriptEntity[] entity, MathjaxFunctionEntity[] mj, VariableFunctionEntity[] vf) {
		super();
		this.entity = entity;
		this.mj = mj;
		this.vf = vf;
	}
	
	public ScriptEntity[] getEntity() {
		return entity;
	}
	
	public MathjaxFunctionEntity[] getMj() {
		return mj;
	}
	
	public VariableFunctionEntity[] getVf() {
		return vf;
	}
	

	
}
