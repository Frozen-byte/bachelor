package de.busybeever.bachelor.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.busybeever.bachelor.data.entity.FunctionEntity;
import de.busybeever.bachelor.data.entity.MathjaxFunctionEntity;
import de.busybeever.bachelor.data.entity.ScriptEntity;
import de.busybeever.bachelor.data.entity.VariableFunctionEntity;
import de.busybeever.bachelor.data.enums.PostResult;
import de.busybeever.bachelor.data.repository.FunctionRepository;
import de.busybeever.bachelor.data.repository.MathjaxFunctionRepository;
import de.busybeever.bachelor.data.repository.ScriptRepository;
import de.busybeever.bachelor.data.repository.VariableFunctionRepository;
import de.busybeever.bachelor.presentation.UpdateDatabaseResponse;
import de.busybeever.bachelor.presentation.admin.DownloadGenerator;
import de.busybeever.bachelor.service.AdminService;
import de.busybeever.bachelor.service.GlobalErrorService;
import de.busybeever.bachelor.service.ValidationService;

@Service
public class AdminServiceImpl implements AdminService {


	
	@Autowired
	private ScriptRepository scriptRepository;
	
	@Autowired
	private VariableFunctionRepository variableFunctionRepository;
	
	@Autowired
	private MathjaxFunctionRepository mathjaxFunctionRepository;
	
	@Autowired
	private ValidationService validationService;
	
	@Autowired
	private GlobalErrorService globalErrorService;
	
	public <T extends FunctionEntity> String[] getRefactoredFunctionEntities(FunctionRepository<T> repo) {
		List<T> entites = repo.findAll();
		String[] data= new String[entites.size()];
		for (int i = 0; i < data.length; i++) {
			T entity = entites.get(i);
			StringBuilder builder = new StringBuilder();
			builder.append(entity.getName());
			builder.append("(");
			builder.append(entity.getParams());
			builder.append(")");
			data[i] = builder.toString();
					
		}	
		return data;	
	}
	
	public <T extends FunctionEntity> UpdateDatabaseResponse saveFunction(T entity, FunctionRepository<T> repository) {
		if(validationService.containsNotAllowedFunctions(entity)) {
			return new UpdateDatabaseResponse(PostResult.NOT_ALLOWED, null);
		}
		if(entity.getId()!=null) {
			T old = repository.findOne(entity.getId());
			if(old!=null) {
				old.setCode(entity.getCode());
				old.setConstants(entity.getConstants());
				old.setDescription(entity.getDescription());
				old.setName(entity.getName());
				old.setParams(entity.getParams());
				old.setTestCode(entity.getTestCode());
				repository.save(old);
				return new UpdateDatabaseResponse(PostResult.UPDATED, old.getId());
			}
		}
		FunctionEntity fe =repository.save(entity);
		return new UpdateDatabaseResponse(PostResult.SAVED_NEW, fe.getId());
		
	}
	
	public <T extends FunctionEntity> String[] getFunctionNames(FunctionRepository<T> repo) {
		List<T> entites = repo.findAll();
		String[] res = new String[entites.size()];
		for (int i = 0; i < res.length; i++) {
			res[i] = entites.get(i).getName();
		}
		return res;
	}
	

	@Override
	public DownloadGenerator downloadGenerator(String[] generatorNames, String[] vf, String[] mj) {
		
		ScriptEntity[] generators = new ScriptEntity[generatorNames.length];
		for (int i = 0; i < generators.length; i++) {
			generators[i] = scriptRepository.findByName(generatorNames[i]);
			generators[i].setId(null);
		}
		VariableFunctionEntity[] vfe = new VariableFunctionEntity[vf.length];
		for (int i = 0; i < vf.length; i++) {
			vfe[i] = variableFunctionRepository.findByName(vf[i]);
			System.out.println(vf[i]);
			System.out.println(vfe[i]);
			
			vfe[i].setId(null);
		}
		MathjaxFunctionEntity[] mje = new MathjaxFunctionEntity[mj.length];
		for (int i = 0; i < mj.length; i++) {
			mje[i] = mathjaxFunctionRepository.findByName(mj[i]);
			mje[i].setId(null);
		}

		return new DownloadGenerator(generators, mje, vfe);
	}
	
	@Override
	public String uploadGenerator(DownloadGenerator data) {
		
		boolean valid = true;
		StringBuilder log = new StringBuilder("Beginne Upload-Prozess \n");
		
		for (VariableFunctionEntity vfe : data.getVf()) {
			valid = valid && !validationService.containsNotAllowedFunctions(vfe);
		}
		
		for (MathjaxFunctionEntity mje : data.getMj()) {
			valid = valid && !validationService.containsNotAllowedFunctions(mje);
		}
		
		for (ScriptEntity se: data.getEntity()) {
			valid = valid && !validationService.containsNotAllowedFunctions(se);
		}
		if(valid) {
			
			for (VariableFunctionEntity vfe : data.getVf()) {
				if(variableFunctionRepository.findByName(vfe.getName()) == null) {
					variableFunctionRepository.save(vfe);
				}else {
					log.append("Variablen-Funktion "+vfe.getName()+" existiert bereits in der Datenbank. Überspringe.\n");
				}
			}
			
			for (MathjaxFunctionEntity mje : data.getMj()) {
				if(mathjaxFunctionRepository.findByName(mje.getName()) == null) {
					mathjaxFunctionRepository.save(mje);
				}else {
					log.append("MathJax-Funktion "+mje.getName()+" existiert bereits in der Datenbank. Überspringe.\n");
				}
			}
			
			for (ScriptEntity se: data.getEntity()) {
				if(scriptRepository.findByName(se.getName()) == null) {
					scriptRepository.save(se);
				}else {
					log.append("Generator "+se.getName()+" existiert bereits in der Datenbank. Überspringe.\n");
				}
			}
			log.append("Upload-Prozess erfolgreich beendet");
			
		} else {
			log.append("Es wurden invalide Skripte gefunden. Breche Upload-Prozess ab.");
		}
		String result = log.toString();
		globalErrorService.appendError(result);
		return result;
		
	}
	
}
