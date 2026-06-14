# La Table Gourmande — site web

Site vitrine pour le restaurant **La Table Gourmande**, 11 Rue du Général Leclerc, 60200 Compiègne.

Site statique, sans dépendance ni build : il suffit d'ouvrir `index.html` dans un navigateur. Idéal pour un hébergement simple (Netlify, Vercel, Cloudflare Pages, OVH, ou tout hébergeur classique).

## Fichiers

| Fichier | Rôle |
|---------|------|
| `index.html` | Structure et contenu de la page (une seule page, sections ancrées) |
| `styles.css` | Design, couleurs, responsive (mobile / tablette / desktop) |
| `script.js` | Navigation, animations, formulaire de réservation |
| `README.md` | Ce document |

## Fonctionnalités

- Design responsive (mobile, tablette, ordinateur)
- Menu de navigation fixe + menu hamburger sur mobile
- Sections : accueil, la maison, la carte, galerie, avis, infos & horaires, réservation
- Carte Google Maps intégrée
- Bouton d'appel flottant sur mobile
- Formulaire de réservation fonctionnel
- Référencement (SEO) : balises meta, Open Graph et données structurées Schema.org (avis, horaires, adresse → résultats enrichis Google)

## Personnalisation rapide

### Recevoir les réservations par e-mail (recommandé)
Par défaut, le formulaire ouvre le logiciel de messagerie du visiteur. Pour recevoir les
demandes automatiquement, sans serveur :

1. Créez un compte gratuit sur https://formspree.io
2. Dans `script.js`, renseignez `FORMSPREE_ENDPOINT` avec l'URL fournie par Formspree.
3. (Optionnel) Modifiez `CONTACT_EMAIL` pour l'adresse de repli.

### Modifier le contenu
- **Carte / prix** : section `<!-- ===== La carte ===== -->` dans `index.html`.
- **Horaires** : table `.hours` dans `index.html` **et** le bloc `openingHoursSpecification` (données structurées) en haut du fichier.
- **Coordonnées** (adresse, téléphone) : présentes dans le bandeau, les infos, le pied de page et les données structurées — pensez à les mettre à jour partout.
- **Photos** : les images proviennent d'Unsplash (libres de droit). Pour utiliser les vraies photos du restaurant, remplacez les URL `https://images.unsplash.com/...` par vos propres fichiers (placez-les dans un dossier `images/` et pointez-y).

## Notes importantes (avant mise en vente / en ligne)

- ⚠️ **Photos** : les visuels actuels sont des images d'illustration libres de droit (Unsplash), **ce ne sont pas les vraies photos du restaurant**. Remplacez-les par des photos réelles avant la mise en production.
- ⚠️ **Menu et prix** : reconstitués à partir des avis et informations publiques en ligne — **à faire valider par le restaurant**.
- L'e-mail de contact `contact@latablegourmande.fr` est un exemple : remplacez-le par l'adresse réelle.

## Mise en ligne (exemple gratuit)

1. Créez un compte sur https://www.netlify.com
2. Glissez-déposez le dossier complet sur le tableau de bord Netlify.
3. Le site est en ligne en quelques secondes (URL gratuite, nom de domaine personnalisable).
