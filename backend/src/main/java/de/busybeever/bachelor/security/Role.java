package de.busybeever.bachelor.security;

public enum Role {
	
	
	Database-Admin(Authority.GENERATOR, Authority.ADMIN, Authority.CLIENT, Authority.GAME),
	User(Authority.CLIENT),
	Admin(Authority.GAME, Authority.GENERATOR)
	
	private Authority[] authorities;
	
	private Role(Authority...authorities) {
		this.authorities = authorities;
	}
	
	public Authority[] getAuthorities() {
		return authorities;
	}
}


