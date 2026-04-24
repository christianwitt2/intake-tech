// Intake Tech - Main Application Logic
let currentStep = 1;
const totalSteps = 4;
let formData = {};

function initForm() {
  document.getElementById('step1').style.display = 'block';
  updateStepIndicator();
}

function updateStepIndicator() {
  for (let i = 1; i <= totalSteps; i++) {
    const step = document.querySelector(`[data-step="${i}"]`);
    if (i < currentStep) {
      step.classList.add('completed');
      step.classList.remove('active');
    } else if (i === currentStep) {
      step.classList.add('active');
      step.classList.remove('completed');
    } else {
      step.classList.remove('active', 'completed');
    }
  }
}

function showStep(step) {
  for (let i = 1; i <= totalSteps; i++) {
    const section = document.getElementById(`step${i}`);
    if (section) {
      section.style.display = i === step ? 'block' : 'none';
    }
  }
  currentStep = step;
  updateStepIndicator();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextStep() {
  if (validateStep(currentStep)) {
    saveStepData(currentStep);
    if (currentStep < totalSteps) {
      showStep(currentStep + 1);
    }
  }
}

function previousStep() {
  if (currentStep > 1) {
    showStep(currentStep - 1);
  }
}

function validateStep(step) {
  const required = document.querySelectorAll(`#step${step} input[required], #step${step} select[required], #step${step} textarea[required]`);
  let isValid = true;
  
  required.forEach(field => {
    if (!field.value.trim()) {
      field.style.borderColor = '#f5576c';
      isValid = false;
    } else {
      field.style.borderColor = '#ddd';
    }
  });
  
  if (!isValid) {
    showError('Please fill in all required fields');
  }
  
  return isValid;
}

function saveStepData(step) {
  const fields = document.querySelectorAll(`#step${step} input, #step${step} select, #step${step} textarea`);
  fields.forEach(field => {
    if (field.type === 'radio' || field.type === 'checkbox') {
      if (field.checked) {
        formData[field.name] = field.value;
      }
    } else {
      formData[field.name] = field.value;
    }
  });
}

function showError(message) {
  const errorDiv = document.getElementById('error-message');
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
  setTimeout(() => {
    errorDiv.style.display = 'none';
  }, 5000);
}

function showSuccess(message) {
  const successDiv = document.getElementById('success-message');
  successDiv.textContent = message;
  successDiv.style.display = 'block';
}

async function submitForm() {
  if (!validateStep(currentStep)) {
    return;
  }
  
  saveStepData(currentStep);
  
  try {
    const response = await fetch('/api/intake', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if (!response.ok) throw new Error('Submission failed');
    
    const result = await response.json();
    displayScore(result);
  } catch (error) {
    showError('Failed to submit form: ' + error.message);
  }
}

function displayScore(result) {
  const scoreDiv = document.getElementById('score-result');
  scoreDiv.innerHTML = `
    <h3>Case Evaluation Complete</h3>
    <div class="score-value">${result.score}/100</div>
    <p><strong>Decision: ${result.decision}</strong></p>
    <p>Estimated Case Value: $${result.caseValue.toLocaleString()}</p>
    <p style="margin-top: 15px; font-size: 14px;">A representative will contact you within 24 hours.</p>
  `;
  scoreDiv.style.display = 'block';
  document.getElementById('form-container').style.display = 'none';
}

window.addEventListener('DOMContentLoaded', initForm);
