package de.busybeever.bachelor.service;

import java.util.List;

import org.springframework.stereotype.Service;

import de.busybeever.bachelor.data.entity.FunctionEntity;
import de.busybeever.bachelor.data.repository.FunctionRepository;

@Service
public class AdminService {

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
	
	public <T extends FunctionEntity> String saveFunction(T entity, FunctionRepository<T> repository) {
		if(entity.getId()!=null) {
			T old = repository.findOne(entity.getId());
			if(old!=null) {
				old.setCode(entity.getCode());
				old.setConstants(entity.getConstants());
				old.setDescription(entity.getDescription());
				old.setName(entity.getName());
				old.setParams(entity.getParams());
				repository.save(old);
				
				return "Updated old entity";
			}
		}
		repository.save(entity);
		return "Created new entity";
		
	}
	
	public <T extends FunctionEntity> String[] getFunctionNames(FunctionRepository<T> repo) {
		List<T> entites = repo.findAll();
		String[] res = new String[entites.size()];
		for (int i = 0; i < res.length; i++) {
			res[i] = entites.get(i).getName();
		}
		return res;
	}
}
