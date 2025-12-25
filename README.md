# ☁️ NuageMaker - Générateur de Nuage de Mots Intelligent

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/fr/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Auteur :** Litissia LARBI  
**Formation :** M1 Informatique & Big Data - Université Paris 8  
**Projet Academique dans le cadre du module :** Hypermedia (2025-2026)

---

##  Table des Matières

- [Vue d'ensemble](#-vue-densemble)
- [Fonctionnalités](#-fonctionnalités)
- [Architecture](#-architecture)
- [Technologies](#-technologies)
- [Installation](#-installation)
- [Utilisation](#-utilisation)
- [Pipeline de Traitement](#-pipeline-de-traitement)
- [Structure du Projet](#-structure-du-projet)
- [Captures d'écran](#-captures-décran)
- [Améliorations Futures](#-améliorations-futures)

---

##  Vue d'ensemble

**NuageMaker** est une application web interactive 100% client-side permettant de générer des **nuages de mots** (word clouds) à partir de textes en français. L'application effectue une analyse linguistique intelligente et produit des visualisations esthétiques et informatives.

### Objectifs du Projet

-  Fournir une visualisation intuitive de la fréquence des mots
-  Appliquer un traitement linguistique intelligent (tokenisation, normalisation)
-  Offrir une interface moderne et responsive
-  Permettre l'exportation des visualisations en PNG

---

##  Fonctionnalités

###  Saisie de Texte
- **Saisie manuelle** : Zone de texte pour coller ou écrire du contenu
- **Import de fichier** : Chargement de fichiers `.txt` (UTF-8)
- **Validation** : Vérification automatique du format

###  Analyse Linguistique
- **Normalisation** : Conversion en minuscules, gestion des accents français
- **Tokenisation** : Découpage intelligent en mots
- **Filtrage** : Suppression des mots vides (500+ mots français)
- **Comptage** : Calcul des fréquences d'apparition

###  Visualisation
- **Nuage de mots** : Rendu graphique avec `wordcloud2.js`
- **Palette de couleurs** : 15 couleurs modernes
- **Liste détaillée** : Mots-clés avec barres de progression
- **Statistiques** : Mots traités, uniques, supprimés

###  Export
- **Téléchargement PNG** : Export haute qualité du nuage généré
- **Nom horodaté** : Fichiers nommés automatiquement

---

##  Architecture

### Architecture 3 Couches (Client-Side)

```
┌─────────────────────────────────────────────────────────────┐
│                        UTILISATEUR                          │
│                  Saisie Texte / Import fichier              │
└────────────────────────────┬────────────────────────────────┘
                             │
                   ┌─────────▼────────────┐
                   │  COUCHE PRÉSENTATION │
                   │  - HTML5 (structure) │
                   │  - CSS3 (design)     │
                   └─────────┬────────────┘
                             │
                   ┌─────────▼────────────────┐
                   │   COUCHE LOGIQUE MÉTIER  │
                   │   - JavaScript ES6+      │
                   │   - Normalisation        │
                   │   - Tokenisation         │
                   │   - Filtrage             │
                   │   - Comptage fréquence   │
                   └─────────┬────────────────┘
                             │
                   ┌─────────▼──────────────┐
                   │  COUCHE VISUALISATION  │
                   │  - Wordcloud2.js       │
                   │  - Canvas HTML5        │
                   │  - Export PNG          │
                   └────────────────────────┘
```

### Caractéristiques Techniques

- **100% Client-Side** : Aucun serveur requis
- **Pas de dépendances back-end** : Traitement local dans le navigateur
- **Performance** : Traitement instantané
- **Confidentialité** : Données jamais envoyées à un serveur

---

##  Technologies

### Front-End

| Technologie       | Version | Utilisation                              |
|-------------------|---------|------------------------------------------|
| **HTML5**         | -       | Structure, Canvas, FileReader API        |
| **CSS3**          | -       | Design responsive, gradients, animations |
| **JavaScript**    | ES6+    | Logique métier, manipulation DOM         |
| **Wordcloud2.js** | 1.2.2   | Génération des nuages de mots            |

### APIs Web Natives

| API                   | Fonction                                 |
|-----------------------|------------------------------------------|
| **FileReader API**    | Lecture asynchrone des fichiers `.txt`   |
| **Canvas 2D Context** | Dessin vectoriel et export PNG           |
| **Fetch API**         | Chargement du fichier `mots-vides.txt`   |
| **Blob API**          | Conversion canvas → image téléchargeable |

### Ressources Externes

- **CDN Cloudflare** : Hébergement de wordcloud2.js
- **Fichier mots-vides.txt** : 500+ mots vides français (articles, pronoms, conjonctions, etc.)

---

##  Installation

### Prérequis

- Navigateur web moderne (Chrome, Firefox, Edge, Safari)
- Pas de serveur requis

### Installation Locale

```bash
# Cloner le repository
git clone https://github.com/votre-username/NuageMaker.git

# Naviguer dans le dossier
cd NuageMaker

# Ouvrir dans le navigateur
# Option 1 : Double-cliquer sur index.html
# Option 2 : Utiliser un serveur local (recommandé)
python -m http.server 8000
# Ouvrir http://localhost:8000
```

### Déploiement

L'application peut être déployée sur :
- **GitHub Pages**
- **Netlify**
- **Vercel**
- N'importe quel hébergeur statique

---

##  Utilisation

### Méthode 1 : Saisie Manuelle

1. Collez ou écrivez votre texte dans la zone de saisie
2. Cliquez sur **Générer le nuage**
3. Visualisez le nuage de mots et les statistiques
4. Cliquez sur **Télécharger** pour exporter en PNG

### Méthode 2 : Import de Fichier

1. Cliquez sur **Importer un fichier .txt**
2. Sélectionnez votre fichier texte (UTF-8)
3. Cliquez sur **Générer le nuage**
4. Téléchargez le résultat

### Formats Acceptés

- **Fichiers** : `.txt` uniquement
- **Encodage** : UTF-8 (pour les accents français)
- **Taille** : Recommandé < 100 Ko pour performance optimale

---

## Pipeline de Traitement

### 1. Acquisition des Données
```
Utilisateur → Zone de texte / Fichier .txt → Application
```

### 2. Normalisation du Texte
```javascript
// Étapes de normalisation :
1. Conversion en minuscules
2. Normalisation des apostrophes (', ' → ')
3. Suppression de la ponctuation (.,:;!?()«»"'…)
4. Conservation des accents français (é, è, à, ç, œ)
5. Consolidation des espaces multiples
```

### 3. Tokenisation et Filtrage
```javascript
// Découpage et filtrage :
1. Split sur les espaces → tokens
2. Filtrage longueur minimum (≥ 3 caractères)
3. Suppression des mots vides (500+ mots français)
```

### 4. Analyse de Fréquence
```javascript
// Comptage et tri :
1. Comptage occurrences de chaque mot unique
2. Tri décroissant par fréquence
3. Limitation à 60 mots les plus fréquents
```

### 5. Visualisation
```javascript
// Génération graphique :
1. Configuration wordcloud2.js (grille 18px, rotations limitées)
2. Application palette de 15 couleurs
3. Génération liste avec barres de progression
4. Affichage statistiques (total, uniques, supprimés)
```

### 6. Export
```javascript
// Téléchargement :
Canvas → toBlob() → Fichier PNG horodaté
```

---

##  Structure du Projet

```
NuageMaker/
├── index.html              # Structure HTML principale
├── style.css               # Styles et design responsive
├── script.js               # Logique métier et visualisation
├── mots-vides.txt          # Liste de 500+ mots vides français
├── README.md               # Documentation
├── LICENSE                 # Licence MIT
└── docs/
    ├── Rapport_Nuage_Mots_Litissia_LARBI.pdf
    └── screenshots/
        ├── interface-vide.png
        └── interface-avec-nuage.png
```

---

##  Captures d'écran

### Interface Initiale

<img src="docs/screenshots/interface-vide.png" alt="Interface vide" width="800">

### Nuage de Mots Généré

<img src="docs/screenshots/interface-avec-nuage.png" alt="Nuage généré" width="800">

---

##  Configuration

### Personnalisation des Couleurs

Dans `script.js`, modifiez la palette de couleurs :

```javascript
const COULEURS = [
    '#1e40af',  // Bleu foncé
    '#7c3aed',  // Violet
    '#db2777',  // Rose
    '#dc2626',  // Rouge
    '#ea580c',  // Orange
    // Ajoutez vos couleurs ici...
];
```

### Modifier les Mots Vides

Éditez le fichier `mots-vides.txt` pour ajouter/supprimer des mots à filtrer :

```
le
la
les
un
une
votre-mot
```

### Configuration Wordcloud2.js

Dans `script.js`, fonction `afficherNuage()` :

```javascript
WordCloud(canvas, {
    gridSize: 18,           // Espacement entre les mots
    weightFactor: ...,      // Taille des mots
    rotateRatio: 0.1,       // Fréquence rotation (0-1)
    minSize: 14,            // Taille minimale
    shape: 'circle',        // Forme du nuage
    // ...
});
```

---

## 🚀 Améliorations Futures

### Fonctionnalités Prévues

- [ ] **Multi-langues** : Support anglais, espagnol, allemand
- [ ] **Thèmes personnalisables** : Mode sombre, thèmes colorés
- [ ] **Formes de nuages** : Cœur, étoile, formes personnalisées
- [ ] **Filtres avancés** : N-grammes, lemmatisation
- [ ] **Export multiple** : SVG, PDF, JSON
- [ ] **Historique** : Sauvegarde des nuages générés
- [ ] **Partage social** : Export vers Twitter, Facebook
- [ ] **API d'analyse** : Intégration NLP (sentiment analysis)


##  Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

```
MIT License

Copyright (c) 2025 Litissia LARBI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

##  Auteur

**Litissia LARBI**  
M1 Informatique & Big Data  
Université Paris 8 Vincennes 
Projet Hypermedia (2025-2026)

  
 LinkedIn : [Litissia LARBI]  
 GitHub : [@litissia-larbi]


---


## ❓ FAQ

### Le nuage ne s'affiche pas ?
- Vérifiez que vous avez saisi du texte
- Assurez-vous que le texte contient au moins 3 mots significatifs
- Videz le cache du navigateur

### Les accents ne s'affichent pas correctement ?
- Assurez-vous que votre fichier `.txt` est encodé en UTF-8

### Comment ajouter mes propres mots vides ?
- Éditez le fichier `mots-vides.txt` et ajoutez un mot par ligne

### Le téléchargement ne fonctionne pas ?
- Vérifiez les permissions de téléchargement dans votre navigateur
- Essayez un autre navigateur (Chrome recommandé)

---

<div align="center">

**⭐ Si ce projet vous a été utile, n'hésitez pas à lui donner une étoile !**

Made with ❤️ by [Litissia LARBI](https://github.com/litissia-larbi)

</div>
