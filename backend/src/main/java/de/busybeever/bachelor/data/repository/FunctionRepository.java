package de.busybeever.bachelor.data.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;

import de.busybeever.bachelor.data.entity.FunctionEntity;

@NoRepositoryBean
public interface FunctionRepository<T extends FunctionEntity> extends CrudRepository<T, Integer> {

	public T findByName(String name);
	public List<T> findAll();
}
