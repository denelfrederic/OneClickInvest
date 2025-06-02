<div align="center">

# 🚀 OneClick Invest

### Site statique moderne avec 11ty et Tailwind CSS

[![GitHub License](https://img.shields.io/badge/license-MIT-0d1117)](LICENSE)
[![11ty](https://img.shields.io/badge/11ty-3.0.0-222)](https://www.11ty.dev/)
[![Tailwind CSS](https://img.shields.io/badge/tailwindcss-3.4.17-38bdf8)](https://tailwindcss.com/)

</div>

## 🌟 À propos

**OneClick Invest (OCI)** est une plateforme de financement participatif innovante qui permet aux entreprises de transformer leurs clients en investisseurs. Ce site présente la solution de "Capital As A Service" développée par l'équipe OCI.

## 🏗️ Architecture technique

### Technologies utilisées

*   **11ty (Eleventy)** : Générateur de site statique ultra-rapide
*   **Tailwind CSS** : Framework CSS utilitaire pour un design moderne
*   **Nunjucks** : Moteur de templates flexible
*   **Markdown-it** : Traitement du contenu markdown avec classes Tailwind

### Avantages de cette approche

- ⚡ **Performance maximale** : Site statique ultra-rapide
- 🔒 **Sécurité** : Aucune base de données, aucune vulnérabilité backend
- 💰 **Coûts réduits** : Hébergement statique peu coûteux
- 🛠️ **Facilité de maintenance** : Contenu géré directement dans le code

## ⚙️ Prérequis

| Composant | Version | Pourquoi ? |
|-----------|---------|------------|
| Node.js | ≥ 18.0.0 | Environnement d'exécution JavaScript |
| npm | ≥ 6.0.0 | Gestionnaire de paquets |

## 🚀 Installation et démarrage

### 1. Cloner et installer
```bash
# Clone le repository
git clone https://github.com/AbsconseOfficiel/OneClickInvest.git
cd OneClickInvest

# Installation des dépendances
npm install
```

### 2. Démarrage en développement
```bash
# Démarrage du serveur de développement avec rechargement automatique
npm run dev
```

Le site sera accessible sur : **http://localhost:8080**

### 3. Build de production
```bash
# Génération du site statique optimisé
npm run build
```

Les fichiers générés seront dans le dossier `_site/`

## 📁 Structure du projet

```
OneClick Invest
├── src/
│   ├── _data/
│   │   └── site.json           # Données du site (contenu, navigation, etc.)
│   ├── _includes/
│   │   ├── header/
│   │   │   └── header.njk      # Template du header
│   │   ├── sections/           # Templates des sections
│   │   └── layout.njk          # Layout principal
│   ├── assets/
│   │   └── styles/
│   │       └── tailwind.css    # Styles Tailwind CSS
│   ├── index.njk               # Page d'accueil
│   └── cgu.njk                 # Page CGU
├── _site/                      # Site généré (automatique)
├── public/
│   └── uploads/                # Images et assets statiques
├── .eleventy.js               # Configuration 11ty
├── tailwind.config.js         # Configuration Tailwind
└── package.json
```

## 🎨 Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Démarrage en développement avec rechargement automatique |
| `npm run build` | Build de production |
| `npm run eleventy-build` | Build 11ty uniquement |
| `npm run eleventy-serve` | Serveur de développement 11ty |
| `npm run tailwind-build` | Compilation CSS de production |
| `npm run tailwind-watch` | Compilation CSS en mode watch |

## ✏️ Modification du contenu

### Données principales
Tout le contenu du site est centralisé dans `src/_data/site.json` :

- **Header** : Navigation, logo
- **Pages** : Sections de chaque page (home, CGU)
- **Footer** : Liens du pied de page

### Ajouter une nouvelle section
1. Éditez `src/_data/site.json`
2. Ajoutez votre section dans `pages.home.sections`
3. Créez le template correspondant dans `src/_includes/sections/`

### Modifier les styles
- Styles globaux : `src/assets/styles/tailwind.css`
- Configuration Tailwind : `tailwind.config.js`
- Classes personnalisées : directement dans les templates

## 🌐 Déploiement

### Netlify (recommandé)
```bash
# Build command
npm run build

# Publish directory
_site
```

### Autres plateformes
Le dossier `_site/` contient le site statique complet, déployable sur :
- Vercel
- GitHub Pages
- AWS S3
- Tout hébergeur statique

## 🎯 Fonctionnalités

- ✅ **Design responsive** avec Tailwind CSS
- ✅ **Animations fluides** et interactions modernes
- ✅ **Navigation par ancres** entre les sections
- ✅ **Menu mobile** optimisé
- ✅ **Système de popup** pour les détails
- ✅ **Formulaire de contact** intégré
- ✅ **Comparateur de prix** interactif
- ✅ **FAQ accordéon** animée
- ✅ **Statistiques animées** au scroll

## 🛠️ Développement

### Ajouter une nouvelle page
1. Créez un fichier `.njk` dans `src/`
2. Ajoutez les données dans `src/_data/site.json`
3. Utilisez les templates existants des sections

### Modifier une section existante
1. Éditez le contenu dans `src/_data/site.json`
2. Modifiez le template dans `src/_includes/sections/`

### Ajouter des assets
- Images : `public/uploads/`
- Fichiers statiques : `public/`

## 🎨 Personnalisation

### Couleurs
Modifiez `tailwind.config.js` :
```js
theme: {
  extend: {
    colors: {
      'custom-blue': '#0000DF', // Votre couleur principale
    }
  }
}
```

### Polices
Configurées dans `src/_includes/layout.njk` :
- **Display** : Halyard Display
- **Text** : Host Grotesk

## 📝 Notes importantes

- **Performance** : Le site génère des pages statiques ultra-rapides
- **SEO** : HTML sémantique et structure optimisée
- **Accessibilité** : Navigation clavier et ARIA labels
- **Maintenance** : Contenu facilement modifiable via JSON

---

<div align="center">
Made with ❤️ by Absconse
</div>