// =====================================================
// SIRIUS WEB - Partículas animadas (páginas promo)
// Configuração via atributos data-* no <canvas id="particulas">:
//   data-cor1="R,G,B"   (obrigatório)
//   data-cor2="R,G,B"   (obrigatório)
//   data-cor3="R,G,B"   (opcional, terceira cor)
//   data-count="N"       (opcional, padrão 28)
// =====================================================

(function() {
    const canvas = document.getElementById('particulas');
    if (!canvas) return;

    const cor1  = canvas.dataset.cor1  || '37,99,235';
    const cor2  = canvas.dataset.cor2  || '96,165,250';
    const cor3  = canvas.dataset.cor3  || null;
    const count = parseInt(canvas.dataset.count || '28');

    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const ps = Array.from({ length: count }, () => {
        let cor;
        if (cor3 && Math.random() > 0.6) {
            cor = cor3;
        } else {
            cor = Math.random() > 0.5 ? cor1 : cor2;
        }
        return {
            x:  Math.random() * window.innerWidth,
            y:  Math.random() * window.innerHeight,
            r:  Math.random() * 1.8 + 0.4,
            vx: (Math.random() - 0.5) * 0.4,
            vy: -(Math.random() * 0.6 + 0.2),
            alpha: Math.random() * 0.5 + 0.1,
            cor
        };
    });

    function anim() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ps.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
            if (p.x < -10) p.x = canvas.width + 10;
            if (p.x > canvas.width + 10) p.x = -10;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.cor},${p.alpha})`;
            ctx.fill();
        });
        requestAnimationFrame(anim);
    }
    anim();
})();
