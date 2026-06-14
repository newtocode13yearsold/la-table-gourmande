/* ===== La Table Gourmande — interactions ===== */
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

  /* --- Apparition au scroll --- */
  var revealTargets = document.querySelectorAll(
    '.histoire__grid, .menu__col, .gallery img, .review, .infos__block, .infos__map, .carte__note, .form, .section__head'
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

  /* --- Date minimale = aujourd'hui --- */
  var dateInput = document.querySelector('input[name="date"]');
  if (dateInput) {
    var today = new Date();
    var iso = today.toISOString().split('T')[0];
    dateInput.min = iso;
  }

  /* --- Formulaire de réservation --- */
  /*
   * Par défaut, le formulaire ouvre le logiciel de messagerie du visiteur
   * avec une demande pré-remplie (fonctionne sans serveur).
   *
   * POUR RECEVOIR LES DEMANDES AUTOMATIQUEMENT PAR E-MAIL :
   *   1. Créez un compte gratuit sur https://formspree.io
   *   2. Remplacez la valeur de FORMSPREE_ENDPOINT ci-dessous par votre URL.
   *   3. Le formulaire enverra alors les demandes directement, sans ouvrir le client mail.
   */
  var FORMSPREE_ENDPOINT = ''; // ex : 'https://formspree.io/f/votrecode'
  var CONTACT_EMAIL = 'contact@latablegourmande.fr'; // adresse de réception (mode mailto)

  var form = document.getElementById('reservationForm');
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
      couverts: form.couverts.value,
      date: form.date.value,
      heure: form.heure.value,
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
            setStatus('Merci ! Votre demande de réservation a bien été envoyée. Nous vous recontactons rapidement.', 'ok');
          } else {
            throw new Error('bad response');
          }
        })
        .catch(function () {
          setStatus('Une erreur est survenue. Appelez-nous au 03 44 37 08 28.', 'err');
        });
    } else {
      /* Repli sans serveur : ouverture du client mail */
      var subject = 'Demande de réservation — ' + data.nom;
      var body =
        'Nouvelle demande de réservation :\n\n' +
        'Nom : ' + data.nom + '\n' +
        'Téléphone : ' + data.tel + '\n' +
        'E-mail : ' + (data.email || '—') + '\n' +
        'Personnes : ' + data.couverts + '\n' +
        'Date : ' + data.date + '\n' +
        'Heure : ' + data.heure + '\n' +
        'Message : ' + (data.message || '—');
      window.location.href =
        'mailto:' + CONTACT_EMAIL +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
      setStatus('Votre logiciel de messagerie va s\'ouvrir pour finaliser l\'envoi. Vous pouvez aussi appeler le 03 44 37 08 28.', 'ok');
    }
  });
})();
