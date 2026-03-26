<script lang="ts">
  import { lang } from '$lib/stores/lang';
</script>

<main class="mx-auto max-w-4xl px-6 pt-28 pb-20">
  <h1 class="text-3xl md:text-5xl font-extrabold text-white mb-4">
    {$lang === 'en' ? 'Privacy Policy' : 'Xeerka Asturnaanta'}
  </h1>

  <p class="text-gray-300 leading-relaxed mb-10">
    {$lang === 'en'
      ? 'This page will contain our full Privacy Policy. For now, here is a short summary.'
      : 'Boggan waxa ku jiri doona Xeerka Asturnaanta oo dhamaystiran. Hadda waxa kaliya oo ku jira kooban.'}
  </p>

  <div class="space-y-6 text-gray-300 leading-relaxed">
    <section class="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
      <h2 class="text-white font-bold text-xl mb-2">
        {$lang === 'en' ? 'What we collect' : 'Waxa aan ururino'}
      </h2>
      <p>
        {$lang === 'en'
          ? 'Basic contact details you provide (like name and phone), and usage data needed to improve the service.'
          : 'Xogta aad si toos ah u bixiso (tusaale: magac iyo taleefoon), iyo xog isticmaal oo naga caawisa horumarinta adeegga.'}
      </p>
    </section>

    <section class="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
      <h2 class="text-white font-bold text-xl mb-2">
        {$lang === 'en' ? 'How we use it' : 'Sida aan u isticmaalno'}
      </h2>
      <p>
        {$lang === 'en'
          ? 'To provide and improve our services, respond to your requests, and support operations.'
          : 'Si aan kuu siino adeegga, u horumarino, uga jawaabno codsiyadaada, una fududeyno hawlaha taageerada.'}
      </p>
    </section>

    <section class="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
      <h2 class="text-white font-bold text-xl mb-2">
        {$lang === 'en' ? 'Contact' : 'Nala soo xiriir'}
      </h2>
      <p>
        {$lang === 'en'
          ? 'If you have questions about privacy, contact us via the Contact page.'
          : 'Haddii aad qabto su’aalo ku saabsan asturnaanta, fadlan nagala soo xiriir bogga Contact.'}
      </p>
    </section>
  </div>
</main>


