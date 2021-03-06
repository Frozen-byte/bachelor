package de.busybeever.bachelor.presentation.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;

import de.busybeever.bachelor.data.entity.MathjaxFunctionEntity;
import de.busybeever.bachelor.data.entity.ScriptEntity;
import de.busybeever.bachelor.data.entity.VariableFunctionEntity;
import de.busybeever.bachelor.data.enums.FormType;
import de.busybeever.bachelor.data.enums.PostResult;
import de.busybeever.bachelor.data.repository.MathjaxFunctionRepository;
import de.busybeever.bachelor.data.repository.ScriptRepository;
import de.busybeever.bachelor.data.repository.VariableFunctionRepository;
import de.busybeever.bachelor.presentation.UpdateDatabaseResponse;
import de.busybeever.bachelor.service.AdminService;
import de.busybeever.bachelor.service.ValidationService;
@PreAuthorize("hasAuthority('ADMIN')")
@RestController
@RequestMapping("admin")
public class AdminRest {

	@Autowired
	private ScriptRepository scriptRepository;
	
	@Autowired
	private VariableFunctionRepository variableFunctionRepository;
	
	@Autowired
	private MathjaxFunctionRepository mathjaxFunctionRepository;
	
	@Autowired
	private AdminService adminService;
	
	@Autowired
	private ValidationService validationSerice;
	
	@GetMapping("/login")
	public String test() {
		return RequestContextHolder.currentRequestAttributes().getSessionId();
	}
	
	
	@GetMapping("/generator")
	public ScriptEntity getEntity(@RequestParam("name")String name) {
		return scriptRepository.findByName(name);
	}
	
	@PostMapping("/generator")
	public UpdateDatabaseResponse postEntity(@RequestBody ScriptEntity entity, @RequestParam("formType")FormType formType) {
		entity.setFormType(formType);
		if(validationSerice.containsNotAllowedFunctions(entity)) {
			return new UpdateDatabaseResponse(PostResult.NOT_ALLOWED, null);
		}
		if(entity.getId()!=null) {
			ScriptEntity old = scriptRepository.findOne(entity.getId());
			if(old!=null) {
				old.setMathjaxScript(entity.getMathjaxScript());
				old.setVariableScript(entity.getVariableScript());
				old.setName(entity.getName());
				old.setSolutionScript(entity.getSolutionScript());
				old.setFormType(entity.getFormType());
				scriptRepository.save(old);
				return new UpdateDatabaseResponse(PostResult.UPDATED, old.getId());
			}
		}
		ScriptEntity res = scriptRepository.save(entity);
		return new UpdateDatabaseResponse(PostResult.SAVED_NEW, res.getId());
	}
	
	@DeleteMapping("/generator")
	public ResponseEntity<?> deleteGenerator(@RequestParam Integer id) {
		if(id==null) {
			return ResponseEntity.notFound().build();
		}
		scriptRepository.delete(id);
		return ResponseEntity.ok().build();
	}
	
	@GetMapping("/variablefunctions")
	public String[] getVariableFunctionNames() {
		return adminService.getFunctionNames(variableFunctionRepository);
	}
	
	@GetMapping("/mathjaxfunctions")
	public String[] getMathjaxFunctionNames() {
		return adminService.getFunctionNames(mathjaxFunctionRepository);
	}
	
	@GetMapping("/variablefunction")
	public VariableFunctionEntity getVariableFunction(@RequestParam("name")String name) {
		return variableFunctionRepository.findByName(name);
	}
	
	@GetMapping("/mathjaxfunction")
	public MathjaxFunctionEntity getMathjaxFunction(@RequestParam("name")String name) {
		return mathjaxFunctionRepository.findByName(name);
	}
	
	@PostMapping("/variablefunction")
	public UpdateDatabaseResponse postVariableFunction(@RequestBody VariableFunctionEntity entity) {
		return adminService.saveFunction(entity, variableFunctionRepository);
	}
	
	@PostMapping("/mathjaxfunction")
	public UpdateDatabaseResponse postMathjaxFunction(@RequestBody MathjaxFunctionEntity entity) {
		return adminService.saveFunction(entity, mathjaxFunctionRepository);

	}
	
	@DeleteMapping("/mathjaxfunction")
	public ResponseEntity<?> deleteMathjaxFunction(@RequestParam Integer id) {
		if(mathjaxFunctionRepository.findOne(id) != null) {
			mathjaxFunctionRepository.delete(id);
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.notFound().build();
	}
	
	@DeleteMapping("/variablefunction")
	public ResponseEntity<?> deleteVariableFunction(@RequestParam Integer id) {
		if(variableFunctionRepository.findOne(id) != null) {
			variableFunctionRepository.delete(id);
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.notFound().build();
	}
	@GetMapping("/rmathjaxfunction")
	public List<MathjaxFunctionEntity> getRefactoredMathjaxFunctions() {
		return mathjaxFunctionRepository.findAll();
	}
	
	@GetMapping("rvariablefunction")
	public List<VariableFunctionEntity> getRefactoredVariableFunctions() {
		return variableFunctionRepository.findAll();	
	}
	
	@GetMapping("downloadGenerator")
	public DownloadGenerator downloadGenerator(@RequestParam("generator") String[] generatorNames, @RequestParam("mj")String[] mj,
			@RequestParam("vf")String[] vf) {
		return adminService.downloadGenerator(generatorNames, vf, mj);
	}
	
	@PostMapping("uploadGenerator")
	public String[] uploadGenerator(@RequestBody DownloadGenerator data) {
		return adminService.uploadGenerator(data);
		
		
	}
	
	
	
	
	
	
}
