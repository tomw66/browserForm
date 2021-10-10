const inputs = document.querySelectorAll('input');
const submitButton = document.querySelector('#submit');
const submitReport = document.querySelector('#submitReport');

const fieldErrors = {
	empty: 'The following field is required.',
	email: 'Provide an email pls.',
    country: 'Must be a UK country.',
    postcode: 'Must be 6 characters exactly',
    password: 'Must be longer than 6 characters and contain letters and numbers',
    confirmPassword: 'Must match password.',
}

function validateInput(field) {
	const errorMessage = document.querySelector(`#${field.name}Error`);
    const passwordCompare = document.querySelector('#password');

	// Reset field state
	field.setCustomValidity('')
	errorMessage.innerHTML = ''

	// Handle empty field
	if (!field.value) {
		field.setCustomValidity(fieldErrors.empty)
		errorMessage.innerHTML = field.validationMessage
		return
	}

	// Handle wrong format field
	if (!field.checkValidity() || (field.name === 'confirmPassword' && field.value !== passwordCompare.value)) {
		field.setCustomValidity(fieldErrors[field.name])
		errorMessage.innerHTML = field.validationMessage
		return
	}
    return true
}

function submitEval() {
    for (let i = 0; i < inputs.length; i++) {
        if(!validateInput(inputs[i])) {
            submitReport.innerHTML = 'Error detected.'
            return
        }
    }
    submitReport.innerHTML = 'Submission successful.'
};

inputs.forEach(input => {
	input.addEventListener('change', () => validateInput(input))
	input.addEventListener('input', () => validateInput(input))
})

submitButton.addEventListener('click', submitEval)