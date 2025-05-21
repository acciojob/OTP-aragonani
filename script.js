//your JS code here. If required.
 const inputs = document.querySelectorAll('.code');

    inputs.forEach((input, index) => {
      input.addEventListener('input', (e) => {
        const value = e.target.value;
        if (value) {
          inputs[index].value = value.charAt(0); // Prevent pasting multiple chars
          if (index < inputs.length - 1) {
            inputs[index + 1].focus();
          }
        }
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
          if (inputs[index].value === "") {
            if (index > 0) {
              inputs[index - 1].focus();
              inputs[index - 1].value = "";
            }
          } else {
            inputs[index].value = "";
          }
          e.preventDefault(); // prevent cursor movement
        }
      });

      input.addEventListener('paste', (e) => {
        const pasteData = e.clipboardData.getData('text');
        const digits = pasteData.replace(/\D/g, '').slice(0, 6).split('');
        digits.forEach((digit, i) => {
          if (inputs[i]) {
            inputs[i].value = digit;
          }
        });
        if (digits.length > 0) {
          const nextIndex = Math.min(digits.length, inputs.length - 1);
          inputs[nextIndex].focus();
        }
        e.preventDefault();
      });
    });

    // Auto focus the first field on page load
    window.addEventListener('load', () => inputs[0].focus());