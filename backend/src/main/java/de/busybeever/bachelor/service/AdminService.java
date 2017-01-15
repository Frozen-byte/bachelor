package de.busybeever.bachelor.service;

import de.busybeever.bachelor.data.entity.FunctionEntity;
import de.busybeever.bachelor.data.repository.FunctionRepository;
import de.busybeever.bachelor.presentation.UpdateDatabaseResponse;

public interface AdminService {

	public <T extends FunctionEntity> String[] getRefactoredFunctionEntities(FunctionRepository<T> repo);
	public <T extends FunctionEntity> UpdateDatabaseResponse saveFunction(T entity, FunctionRepository<T> repository);
	public <T extends FunctionEntity> String[] getFunctionNames(FunctionRepository<T> repo) ;
}
