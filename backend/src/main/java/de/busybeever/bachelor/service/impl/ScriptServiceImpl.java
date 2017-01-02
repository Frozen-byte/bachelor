package de.busybeever.bachelor.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.busybeever.bachelor.data.entity.FunctionEntity;
import de.busybeever.bachelor.data.entity.ScriptEntity;
import de.busybeever.bachelor.data.repository.MathjaxFunctionRepository;
import de.busybeever.bachelor.data.repository.ScriptRepository;
import de.busybeever.bachelor.data.repository.VariableFunctionRepository;
import de.busybeever.bachelor.service.ScriptService;

@Service
public class ScriptServiceImpl implements ScriptService{

	@Autowired
	private MathjaxFunctionRepository mjRepo;

	@Autowired
	private VariableFunctionRepository vfRepo;
	
	@Autowired
	private ScriptRepository scriptRepository;

	public String getMathjaxScript() {

		StringBuilder builder = new StringBuilder();

		builder.append("mj= { \n");
		appendScript(mjRepo.findAll(), builder);
		builder.append("\n}");
		

		return builder.toString();
	}

	public String getVariableScript() {
		StringBuilder builder = new StringBuilder();

		builder.append("vf= { \n");
		appendScript(vfRepo.findAll(), builder);
		builder.append("\n}");
		return builder.toString();
	}

	private void appendScript(Iterable<? extends FunctionEntity>entities, StringBuilder builder) {
		boolean appendComma=false;
		for (FunctionEntity entity : entities) {
			if(appendComma) {
				builder.append(", \n");
			}
			if(entity.getConstants()!=null) {
				builder.append(entity.getConstants());
				builder.append(",\n");
			}
			builder.append(entity.getName()+":function(");
			builder.append(entity.getParams());
			builder.append("){\n");
			builder.append(entity.getCode());
			builder.append("}");
			appendComma=true;
		}

	}
	
	public String constructScript(ScriptEntity entity) {
		
		StringBuilder builder = new StringBuilder();
		builder.append("function generateVariables() {");
		builder.append(entity.getVariableScript());
		builder.append("}");
		builder.append("function generateMathjax(variables){");
		builder.append(entity.getMathjaxScript());
		builder.append("}");
		builder.append("function testSolution(variables, solution) {");
		builder.append(entity.getSolutionScript());
		builder.append("}");
		builder.append("function getComputedMathjax(variables){");
		builder.append("var mathjax= generateMathjax(variables);");
		builder.append("for (var key in variables) {");
		builder.append("var replacer = \"$\" + key;");
		builder.append("mathjax = mathjax.split(replacer).join(variables[key]);");
		builder.append("}");
		builder.append("return mathjax");
		builder.append("}");
		
		
		String script = builder.toString();
		
		
		
		return script;
	}
}
