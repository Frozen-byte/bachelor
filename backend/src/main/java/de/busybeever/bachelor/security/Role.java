package de.busybeever.bachelor.security;

public enum Role {
	
	
	Admin(Authority.GENERATOR, Authority.ADMIN, Authority.CLIENT, Authority.GAME),
	User(Authority.CLIENT);
	
	private Authority[] authorities;
	
	private Role(Authority...authorities) {
		this.authorities = authorities;
	}
	
	public Authority[] getAuthorities() {
		return authorities;
	}
}


