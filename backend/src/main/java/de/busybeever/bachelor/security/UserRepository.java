package de.busybeever.bachelor.security;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends CrudRepository<UserEntity, Long> {
	
    public UserEntity findByUserName(String name);
    
}