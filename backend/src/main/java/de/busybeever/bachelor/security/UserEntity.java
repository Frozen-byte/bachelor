package de.busybeever.bachelor.security;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class UserEntity implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)    
    @Column(name="id")
    private Long id;

	@Column(name = "username")
    private String userName;   

	@Column(name = "password")
    private String password;   
	
	@Enumerated
	@Column(name="role")
	private Role role;

	public Long getId() {
		return id;
	}
	
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	public Role getRole() {
		return role;
	}
	
	
  
}