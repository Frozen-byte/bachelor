package de.busybeever.bachelor.security;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserEntity user = userRepository.findByUserName(username);
		if (user == null) {
			throw new UsernameNotFoundException("No user present with username: " + username);
		} else {

			Set<GrantedAuthority> authorities = new HashSet<>();
			Role role = user.getRole();
			for (int i = 0; i < role.getAuthorities().length; i++) {
				authorities.add(new SimpleGrantedAuthority(role.getAuthorities()[i].name()));
			}

			return new CustomUserDetails(user, authorities);
		}
	}

}
