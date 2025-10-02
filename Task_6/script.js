document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', (event) => {
      
        event.preventDefault(); 
        
        
        resetErrors();
        let isValid = true;

      
        const nameRegex = /^[a-zA-Z\s]{2,}$/;

        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required.';
            isValid = false;
        }
        else if (!nameRegex.test(nameInput.value.trim())) {
            nameError.textContent = 'Please enter a valid name.';
            isValid = false;
        }
       
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        
        if (messageInput.value.trim().length <7) {
            messageError.textContent = 'Please enter a valid message.';
            isValid = false;
        }

       
        if (isValid) {
            successMessage.textContent = 'Form submitted successfully!';
            form.reset();
        }
    });

    function resetErrors() {
        nameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';
        successMessage.textContent = '';
    }
});