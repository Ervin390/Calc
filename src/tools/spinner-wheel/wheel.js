document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas-wheel');
    const ctx = canvas.getContext('2d');
    const textArea = document.getElementById('wheel-inputs');
    const btnSpin = document.getElementById('btn-spin');
    const displayWinner = document.getElementById('wheel-winner');

    let items = [];
    let currentAngle = 0;
    let isSpinning = false;
    let isStopping = false;
    let spinVelocity = 0;
    let animationFrame;

    // A nice palette of distinctive colors
    const colors = [
        '#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#d946ef', '#f43f5e'
    ];

    function updateItems() {
        if (isSpinning) return;
        const text = textArea.value;
        items = text.split('\n').map(t => t.trim()).filter(t => t.length > 0);
        if (items.length === 0) {
            items = ['Empty'];
        }
        drawWheel();
    }

    function drawWheel() {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 10;
        const sliceAngle = (2 * Math.PI) / items.length;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < items.length; i++) {
            const startAngle = currentAngle + i * sliceAngle;
            const endAngle = startAngle + sliceAngle;

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();

            ctx.fillStyle = colors[i % colors.length];
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#ffffff';
            ctx.stroke();

            // Draw text
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(startAngle + sliceAngle / 2);
            ctx.textAlign = 'right';
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 16px Inter, sans-serif';
            
            let dispText = items[i];
            if (dispText.length > 15) dispText = dispText.substring(0, 15) + '...';
            
            ctx.fillText(dispText, radius - 20, 5);
            ctx.restore();
        }

        // Draw center circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#e5e7eb';
        ctx.stroke();

        // Draw pointer (right side)
        ctx.beginPath();
        ctx.moveTo(canvas.width - 5, centerY);
        ctx.lineTo(canvas.width - 25, centerY - 10);
        ctx.lineTo(canvas.width - 25, centerY + 10);
        ctx.closePath();
        ctx.fillStyle = '#111827';
        ctx.fill();
    }

    // Cryptographically secure random speed
    function getSecureSpin() {
        if (window.crypto && window.crypto.getRandomValues) {
            let arr = new Uint32Array(1);
            window.crypto.getRandomValues(arr);
            // Result bounded between 0.3 and 0.6 for visual satisfaction
            return 0.3 + (arr[0] / (0xffffffff + 1)) * 0.3;
        }
        return 0.3 + Math.random() * 0.3;
    }

    function animateSpin() {
        currentAngle += spinVelocity;
        
        if (isStopping) {
            spinVelocity *= 0.90; // Extremely rapid deceleration when forcefully stopped
        } else {
            spinVelocity *= 0.985; // Natural deceleration so it stops on its own eventually
        }

        if (spinVelocity < 0.001) {
            isSpinning = false;
            isStopping = false;
            spinVelocity = 0;
            cancelAnimationFrame(animationFrame);
            determineWinner();
            return;
        }

        drawWheel();
        animationFrame = requestAnimationFrame(animateSpin);
    }

    function determineWinner() {
        isSpinning = false;
        isStopping = false;
        btnSpin.textContent = 'Spin The Wheel!';
        
        if (items.length === 0) return;
        
        let normalizedAngle = currentAngle % (2 * Math.PI);
        if (normalizedAngle < 0) normalizedAngle += 2 * Math.PI;

        const sliceAngle = (2 * Math.PI) / items.length;
        
        // Pointer is at angle 0 (right side). 
        // We need to find which slice covers angle (2*PI - normalizedAngle)
        let pointingAngle = (2 * Math.PI - normalizedAngle) % (2 * Math.PI);
        
        let index = Math.floor(pointingAngle / sliceAngle);
        if (items[index]) {
            displayWinner.textContent = items[index];
            // Quick visual pop
            displayWinner.style.transform = 'scale(1.1)';
            setTimeout(() => {
                displayWinner.style.transform = 'scale(1)';
            }, 200);
        }
    }

    btnSpin.addEventListener('click', () => {
        if (isSpinning) {
            if (!isStopping) {
                isStopping = true;
                btnSpin.textContent = 'Stopping...';
            }
            return; // Ignore further clicks while it's stopping
        }
        
        if (items.length === 0 || items[0] === 'Empty') return;
        
        displayWinner.textContent = 'Spinning...';
        isSpinning = true;
        isStopping = false;
        btnSpin.textContent = 'Stop Wheel';
        
        spinVelocity = getSecureSpin() + 0.1; // Speed boost
        animateSpin();
    });

    textArea.addEventListener('input', updateItems);
    
    // Initial draw
    updateItems();
});
