package fr.aleclerc.sprint.graph.validator;

import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import fr.aleclerc.sprint.graph.entities.Story;

public class StoryValidator implements Validator {

	@Override
	public boolean supports(Class<?> clazz) {
		return Story.class.equals(clazz);
	}

	@Override
	public void validate(Object obj, Errors errors) {
		Story s = (Story) obj;
		if(s== null){
			errors.reject("story","story.empty");
		}
		if(s!= null && s.getBusinessValue() ==null){
			errors.rejectValue("businessValue", "businessValue.empty");
		}
		if(s!= null &&  s.getBusinessValue()!=null &&  s.getBusinessValue()<0){
			errors.rejectValue("businessValue", "businessValue.empty", "The business value cannot be negative");
		}
	}

}
