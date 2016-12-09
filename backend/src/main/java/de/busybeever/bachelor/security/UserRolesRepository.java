package de.busybeever.bachelor.security;
import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRolesRepository extends CrudRepository<UserRoleEntity, Long> {
	
	
    public List<UserRoleEntity> findByUserid(Long userid);
	
}