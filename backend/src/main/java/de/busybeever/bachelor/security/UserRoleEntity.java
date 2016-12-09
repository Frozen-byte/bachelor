package de.busybeever.bachelor.security;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="user_roles")
public class UserRoleEntity {

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)    
    @Column(name="id")
	private Long id;
	
	@Column(name="userid")
	private Long userid;
	
	@Enumerated(EnumType.STRING)
	@Column(name="role")
	private Role role;	

	
	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public Long getUserid() {
		return userid;
	}

	public void setUserid(Long userid) {
		this.userid = userid;
	}

	
}
