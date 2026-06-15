# O'Brunch Compiègne — site web

Site vitrine pour **O'Brunch Compiègne**, 15-17 Place d'Armes, 60200 Compiègne — brunch fait maison, sans réservation.

Site statique, sans dépendance ni build : il suffit d'ouvrir `index.html` dans un navigateur. Idéal pour un hébergement simple (Netlify, Vercel, Cloudflare Pages, OVH, etc.).

## Fichiers

| Fichier | Rôle |
|---------|------|
| `index.html` | Structure et contenu (page unique, sections ancrées) |
| `styles.css` | Design, couleurs, responsive (mobile / tablette / desktop) |
| `script.js` | Navigation, menu hamburger |
| `README.md` | Ce document |

## Fonctionnalités

- Design responsive (mobile, tablette, ordinateur)
- Thème « brunch » chaleureux (terracotta, crème, miel)
- Menu de navigation fixe + menu hamburger sur mobile
- Sections : accueil, le concept, la carte, galerie, avis, infos & horaires
- Carte Google Maps intégrée
- Bouton flottant « itinéraire » sur mobile
- SEO : balises meta, Open Graph et données structurées Schema.org (adresse, horaires)

## ⚠️ À vérifier / valider avant mise en ligne

Les informations ci-dessous ont été reconstituées à partir d'infos publiques (fiche Google, registre des entreprises, site de la marque O'Brunch) et **doivent être confirmées par l'établissement** :

- **Adresse** : 15-17 Place d'Armes, 60200 Compiègne (source : registre des entreprises / annuaire-entreprises.data.gouv.fr).
- **Horaires** : indicatifs, basés sur le fonctionnement de la marque O'Brunch — à confirmer pour le site de Compiègne.
- **Carte & prix** : reconstitués à partir de la carte O'Brunch — à valider (la carte de Compiègne peut différer de celle de Creil).
- **Téléphone** : non renseigné publiquement au moment de la création — à ajouter (bandeau, infos, pied de page, données structurées).
- **Photos** : les visuels sont des images d'illustration libres de droit (Unsplash), **ce ne sont pas les vraies photos de l'établissement**. Remplacez les URL `https://images.unsplash.com/...` par les photos réelles (placez-les dans un dossier `images/`).

## Personnaliser le contenu

- **Carte / prix** : section `<!-- ===== La carte ===== -->` dans `index.html`.
- **Horaires** : table `.hours` dans `index.html` **et** le bloc `openingHoursSpecification` (données structurées) en haut du fichier.
- **Coordonnées** (adresse, téléphone) : présentes dans le bandeau, les infos, le pied de page et les données structurées — pensez à les mettre à jour partout.
- **Couleurs** : variables `:root` en haut de `styles.css`.

## Mise en ligne (exemple gratuit)

1. Créez un compte sur https://www.netlify.com
2. Glissez-déposez le dossier complet sur le tableau de bord Netlify.
3. Le site est en ligne en quelques secondes (URL gratuite, nom de domaine personnalisable).
