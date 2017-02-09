package de.busybeever.bachelor.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabase;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;

import com.mysql.jdbc.jdbc2.optional.MysqlDataSource;

@Configuration
public class DatabaseConfig {

	@Value("${opentasks.embedded}")
	private boolean embedded;

	@Value("${opentasks.datasource.url}")
	private String databaseURL;

	@Value("${opentasks.datasource.username}")
	private String databaseUser;

	@Value("${opentasks.datasource.password}")
	private String databasePassword;

	@Value("${opentasks.datasource.driver-class-name}")
	private String driver;

	@Bean
	public DataSource dataSource() {
		
		if (embedded) {
			EmbeddedDatabaseBuilder builder = new EmbeddedDatabaseBuilder();
			EmbeddedDatabase db = builder
					.setType(EmbeddedDatabaseType.H2)
					.addScript("db.sql")
					.build();
			return db;
		} else {
			DriverManagerDataSource dataSource = new DriverManagerDataSource();
			dataSource.setDriverClassName(driver);
			dataSource.setUrl(databaseURL);
			dataSource.setUsername(databaseUser);
			dataSource.setPassword(databasePassword);
			return dataSource;
		}

	}

}
