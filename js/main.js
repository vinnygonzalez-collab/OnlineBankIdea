// --- DOM Selectors ---
const form = document.getElementById('bankSignupForm');
const ssnInput = document.getElementById('ssn');
const confirmationMessage = document.getElementById('bank-application-confirmation');

// --- SSN Auto-Formatting Mask ---
// Automatically injects dashes while typing to ensure consistent strucural formatting 
ssnInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Extract numbers only
    if (value.length > 3 && value.length <= 5) {
        value = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else if (value.length > 5) {
        value = `${value.slice(0, 3)}-${value.slice(3, 5)}-${value.slice(5, 9)}`;
    }
    e.target.value = value;
});

// -- Step 1 Validation Definitions ---
function validateStep1() {
    let isValid = true;

    const name = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const ssn = document.getElementById('ssn').value.trim();
    const address = document.getElementById('billingAddress').value.trim();

    // Legal Name Validation
    if (name.length < 3) {
        document.getElementById('nameError').textContent = "Legal name required (minimum 3 characters).";
        isValid = false;
    } else {
        document.getElementById('nameError').textContent = "";
    }

    // Basic Email Structure Filter
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = "Please enter a valid email address.";
        isValid = false;
    } else {
        document.getElementById('emailError').textContent = "";
    }

    if (!/^\d{3}-\d{2}-\d{4}$/.test(ssn)) {
        document.getElementById('ssnError').textContent = "Please enter a valid Social Security Number.";
        isValid = false;
    } else {
        document.getElementById('ssnError').textContent = "";
    }

    // Address Check
    if (address.length < 8) {
        document.getElementById('addressError').textContent = "Please enter your full complete address.";
        isValid = false;
    } else {
        document.getElementById('addressError').textContent = "";
    }

    return isValid;
}

// --- Step 2 Validation Definitions ---
function validateStep2() {
    let isValid = true;
    const accountType = document.getElementById('accountType').value;
    const password = document.getElementById('password').value;

    // Account Dropdown Seelection Selection
    if (!accountType) {
        document.getElementById('accountTypeError').textContent = "Please select an account type you would wish to apply for.";
        isValid = false;
    } else {
        document.getElementById('accountTypeError').textContent = "";
    }

    // Password Comlexity Rule (Min 8 Characters, 1 Number, 1 Capital)
    const passwordRegex = /(?=.*\d)(?=.*[A-Z]).{8,}/;
    if (!passwordRegex.test(password)) {
        document.getElementById('passwordError').textContent = "Incorrect Password.";
        isValid = false;
    } else {
        document.getElementById('passwordError').textContent = "";
    }

    return isValid;
}

function goToStep(stepNumber) {
    document.querySelectorAll('.form-step').forEach((step) => {
        step.classList.toggle('active', step.id === `step${stepNumber}`);
    });
}

function nextStep(currentStep, nextStepNumber) {
    if (currentStep === 1 && validateStep1()) {
        goToStep(nextStepNumber);
    }
}

function prevStep(currentStep, previousStepNumber) {
    goToStep(previousStepNumber);
}

// --- Global Intercept Submission Handler ---
form.addEventListener('submit', function(e){
    e.preventDefault(); 
    // HALT standard insecure submission route refeshes

    // Double-verify step validation conditions before packaging payload data
    const isStep1Valid = validateStep1();
    const isStep2Valid = validateStep2();

    if (isStep1Valid && isStep2Valid) {
        const cleanApplicationPayload = {
            legalName: document.getElementById('fullName').value.trim(),
            email: document.getElementById('email').value.trim(),
            ssn: document.getElementById('ssn').value.trim(),
            billingAddress: document.getElementById('billingAddress').value.trim(),
            passphraseHashAttempt: document.getElementById('password').value // Pass strictly via active TLS
        };

        console.log("Transmission initialized secure payload processing architecture...", cleanApplicationPayload);
        confirmationMessage.textContent = `Thank you, ${cleanApplicationPayload.legalName}! Your bank account application has been submitted successfully. We will contact you by email with the next steps.`;
        confirmationMessage.hidden = false;
        alert('Your bank account application has been submitted successfully. Please check your email for further steps in the signup process.');
        form.reset();
        goToStep(1);
    }
});