/* ===== Le Miel de [NOM] — interactions ===== */
(function () {
  'use strict';

  /* --- Année du copyright --- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* --- Navigation : fond au scroll --- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 60) nav.classList.add('nav--scrolled');
    else nav.classList.remove('nav--scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Menu mobile --- */
  var burger = document.getElementById('burger');
  var links = document.getElementById('navLinks');
  function closeMenu() {
    links.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }
  burger.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  /* --- Photos manquantes : on garde le fond dégradé "miel" au lieu d'une image cassée.
         (À supprimer une fois toutes les vraies photos ajoutées dans /images.) --- */
  var TRANSPARENT = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%221%22 height=%221%22%3E%3C/svg%3E';
  document.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('error', function () {
      if (img.src.indexOf('data:image') === 0) return;
      img.src = TRANSPARENT;
    });
  });

  /* --- Apparition au scroll --- */
  var revealTargets = document.querySelectorAll(
    '.histoire__grid, .produit, .atout, .gallery img, .carte__note, .form, .section__head'
  );
  revealTargets.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('visible'); });
  }

  /* --- Formulaire de commande --- */
  /*
   * Par défaut, le formulaire ouvre le logiciel de messagerie du visiteur
   * avec une demande pré-remplie (fonctionne sans serveur).
   *
   * POUR RECEVOIR LES DEMANDES AUTOMATIQUEMENT PAR E-MAIL :
   *   1. Créez un compte gratuit sur https://formspree.io
   *   2. Remplacez la valeur de FORMSPREE_ENDPOINT ci-dessous par votre URL.
   *   3. Remplacez aussi CONTACT_EMAIL par votre adresse de réception.
   */
  var FORMSPREE_ENDPOINT = ''; // ex : 'https://formspree.io/f/votrecode'
  var CONTACT_EMAIL = 'votre-adresse@exemple.fr'; // adresse de réception (mode mailto)

  var form = document.getElementById('commandeForm');
  var status = document.getElementById('formStatus');

  function setStatus(msg, type) {
    status.textContent = msg;
    status.className = 'form__status' + (type ? ' ' + type : '');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      setStatus('Merci de remplir les champs obligatoires (*).', 'err');
      form.reportValidity();
      return;
    }

    var data = {
      nom: form.nom.value.trim(),
      tel: form.tel.value.trim(),
      email: form.email.value.trim(),
      produit: form.produit.value,
      quantite: form.quantite.value,
      message: form.message.value.trim()
    };

    if (FORMSPREE_ENDPOINT) {
      setStatus('Envoi en cours…');
      fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (r) {
          if (r.ok) {
            form.reset();
            setStatus('Merci ! Votre demande a bien été envoyée. Nous vous recontactons rapidement.', 'ok');
          } else {
            throw new Error('bad response');
          }
        })
        .catch(function () {
          setStatus('Une erreur est survenue. Vous pouvez aussi nous appeler.', 'err');
        });
    } else {
      /* Repli sans serveur : ouverture du client mail */
      var subject = 'Commande de miel — ' + data.nom;
      var body =
        'Nouvelle demande de commande :\n\n' +
        'Nom : ' + data.nom + '\n' +
        'Téléphone : ' + data.tel + '\n' +
        'E-mail : ' + (data.email || '—') + '\n' +
        'Produit : ' + data.produit + '\n' +
        'Quantité : ' + data.quantite + '\n' +
        'Message : ' + (data.message || '—');
      window.location.href =
        'mailto:' + CONTACT_EMAIL +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
      setStatus('Votre logiciel de messagerie va s\'ouvrir pour finaliser l\'envoi.', 'ok');
    }
  });
})();
