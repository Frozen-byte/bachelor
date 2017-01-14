package de.busybeever.bachelor.presentation;

import de.busybeever.bachelor.data.enums.PostResult;

public class UpdateDatabaseResponse {

	private PostResult result;
	private Integer id;
	
	public PostResult getResult() {
		return result;
	}
	
	public Integer getId() {
		return id;
	}

	public UpdateDatabaseResponse(PostResult result, Integer id) {
		super();
		this.result = result;
		this.id = id;
	}
	
}
