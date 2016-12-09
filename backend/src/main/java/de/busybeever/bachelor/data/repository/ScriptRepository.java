package de.busybeever.bachelor.data.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import de.busybeever.bachelor.data.entity.ScriptEntity;


public interface ScriptRepository extends CrudRepository<ScriptEntity, Integer> {

	public List<ScriptEntity> findAll();
	
	public ScriptEntity findByName(String name);

}
