// Configuration 
let motsVides = new Set();
let donnees = [];
// palete de couleur du nuage 
const COULEURS = [
    '#1e40af', 
    '#7c3aed', 
    '#db2777', 
    '#dc2626', 
    '#ea580c', 
    '#16a34a',
    '#0891b2', 
    '#4f46e5', 
    '#be123c', 
    '#0d9488',
    '#6366f1', 
    '#8b5cf6', 
    '#059669', 
    '#d97706', 
    '#0284c7' 
];

// Chargement des mots vides 
fetch('mots-vides.txt')
    .then(r => r.text())
    .then(t => {
        t.split('\n').forEach(l => {
            let m = l.trim().toLowerCase();
            if(m) motsVides.add(m);
        });
    });

// Gestion du chargement de fichier texte 
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('file')?.addEventListener('change', e => {
        const f = e.target.files[0];
        if(!f) return;
        
        if(!f.name.endsWith('.txt')) {
            alert('Fichier .txt uniquement');
            return;
        }
        
        document.getElementById('fileName').textContent = f.name;
        const reader = new FileReader();
        reader.onload = evt => document.getElementById('text').value = evt.target.result;
        reader.readAsText(f, 'UTF-8');
    });
});

// Generation du nuage de mots
function generer() {
    const texteOriginal = document.getElementById('text').value;
    if(!texteOriginal.trim()) {
        alert('Veuillez saisir un texte');
        return;
    }
    
    try {
        //NETTOYAGE ET NORMALISATION
        const textePropre = texteOriginal.toLowerCase();
        const texteNormalise = textePropre
            .replace(/['']/g, "'")
            .replace(/[.,;:!?()«»"'…\[\]{}\-––\/\\]/g, ' ')
            .replace(/[^a-zàâäæçéèêëïîôùûüÿœ\s]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        
        //TOKENISATION
        const motsInitiaux = texteNormalise.split(/\s+/).filter(m => m.length > 0);
        const tokens = motsInitiaux.filter(m => m.length > 2 && !motsVides.has(m));
        const motsSupprimes = motsInitiaux.length - tokens.length;
        
        if(tokens.length === 0) {
            alert('Aucun mot après tokenisation');
            return;
        }
        
        //COMPTAGE
        const frequences = {};
        tokens.forEach(m => frequences[m] = (frequences[m] || 0) + 1);
        
        //PREPARATION Limiter a  60 mots pour eviter surcharge
        donnees = Object.entries(frequences).sort((a,b) => b[1] - a[1]).slice(0, 60);
        
        // Statistiques
        document.getElementById('total').textContent = motsInitiaux.length;
        document.getElementById('unique').textContent = donnees.length;
        document.getElementById('removed').textContent = motsSupprimes;
        document.getElementById('stats').style.display = 'block';
        
        // VISUALISATION avec wordcloud2.js
        afficherNuage(donnees, donnees[0][1]);
        afficherListe(donnees, donnees[0][1]);
        document.getElementById('download').style.display = 'block';
        
    } catch(err) {
        alert('Erreur: ' + err.message);
    }
}

// Afficher le nuage avec wordcloud2.js 
function afficherNuage(data, maxFreq) {
    const canvas = document.getElementById('cloud');
    
    if(!data?.length) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#adb5bd';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Aucun mot', canvas.width / 2, canvas.height / 2);
        return;
    }
    
    // Effacer le canvas avant de redessiner
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Preparer les donnees pour wordcloud2.js
    const liste = data.map(([mot, freq]) => [mot, freq]);
    
    // Configuration de wordcloud2.js 
    WordCloud(canvas, {
        list: liste,
        gridSize: 18,
        // Facteur de poids modere pour des mots de taille raisonnable
        weightFactor: function(size) {
            const baseFactor = canvas.width / 600;
            return Math.pow(size, 0.5) * baseFactor * 18;
        },
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontWeight: '600',
        color: function() {
            return COULEURS[Math.floor(Math.random() * COULEURS.length)];
        },
        rotateRatio: 0.1,
        rotationSteps: 2,
        backgroundColor: '#ffffff',
        drawOutOfBound: false,
        shrinkToFit: true,
        minSize: 14,
        shape: 'circle',
        ellipticity: 0.7,
        // wait=0 pour affichage instantané de tous les mots
        wait: 0,
        shuffle: true,
        clearCanvas: true
    });
}

// Afficher la liste des mots
function afficherListe(data, maxFreq) {
    const container = document.getElementById('keywords');
    
    if(!data?.length) {
        container.innerHTML = '<p style="text-align:center;color:#555;padding:40px">Aucun mot-clé</p>';
        return;
    }
    
    container.innerHTML = data.slice(0, 50).map(([mot, freq]) => `
        <div class="keyword">
            <div class="keyword-header">
                <span class="keyword-word">${mot}</span>
                <span class="keyword-count">${freq}</span>
            </div>
            <div class="bar-bg">
                <div class="bar" style="width:${(freq/maxFreq)*100}%"></div>
            </div>
        </div>
    `).join('');
}

// Telecharger le nuage en PNG
function telecharger() {
    if(!donnees?.length) {
        alert('Aucun nuage à télécharger');
        return;
    }
    
    const canvas = document.getElementById('cloud');
    
    canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.download = `nuage-mots-${new Date().toISOString().slice(0,10)}.png`;
        a.href = url;
        a.click();
        URL.revokeObjectURL(url);
    });
}