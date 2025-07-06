document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');
    const lengthCriteria = document.getElementById('length-criteria');
    const uppercaseCriteria = document.getElementById('uppercase-criteria');
    const lowercaseCriteria = document.getElementById('lowercase-criteria');
    const numberCriteria = document.getElementById('number-criteria');
    const specialCriteria = document.getElementById('special-criteria');

    passwordInput.addEventListener('input', updatePasswordStrength);

    function updatePasswordStrength() {
        const password = passwordInput.value;
        let score = 0;

        // Reset criteria classes
        lengthCriteria.className = 'invalid';
        uppercaseCriteria.className = 'invalid';
        lowercaseCriteria.className = 'invalid';
        numberCriteria.className = 'invalid';
        specialCriteria.className = 'invalid';

        // Criteria checks
        // 1. Length
        if (password.length >= 8) {
            lengthCriteria.className = 'valid';
            score += 1;
        }
        if (password.length >= 12) { // Add more points for longer passwords
            score += 1;
        }

        // 2. Uppercase
        if (/[A-Z]/.test(password)) {
            uppercaseCriteria.className = 'valid';
            score += 1;
        }

        // 3. Lowercase
        if (/[a-z]/.test(password)) {
            lowercaseCriteria.className = 'valid';
            score += 1;
        }

        // 4. Numbers
        if (/[0-9]/.test(password)) {
            numberCriteria.className = 'valid';
            score += 1;
        }

        // 5. Special Characters
        if (/[^A-Za-z0-9]/.test(password)) {
            specialCriteria.className = 'valid';
            score += 1;
        }

        // Update strength bar and text
        let strength = "";
        let barWidth = 0;
        let barColor = "";

        if (password.length === 0) {
            strength = "Enter a password";
            barWidth = 0;
            barColor = "";
        } else if (score < 3) {
            strength = "Weak";
            barWidth = 25;
            barColor = "weak";
        } else if (score < 5) {
            strength = "Medium";
            barWidth = 50;
            barColor = "medium";
        } else if (score < 7) {
            strength = "Strong";
            barWidth = 75;
            barColor = "strong";
        } else {
            strength = "Excellent!";
            barWidth = 100;
            barColor = "excellent";
        }

        strengthBar.style.width = `${barWidth}%`;
        strengthBar.className = `strength-bar ${barColor}`;
        strengthText.textContent = strength;
        strengthText.className = barColor;
    }

    // Initial update for empty password field
    updatePasswordStrength();
});