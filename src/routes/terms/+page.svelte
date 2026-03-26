<script lang="ts">
  import { lang } from '$lib/stores/lang';
</script>

<main class="mx-auto max-w-4xl px-6 pt-28 pb-20">
  <h1 class="text-3xl md:text-5xl font-extrabold text-white mb-4">
    {$lang === 'en' ? 'Terms of Service' : 'Shuruudaha Adeegga'}
  </h1>

  <p class="text-gray-300 leading-relaxed mb-10">
    {$lang === 'en'
      ? 'This page will contain our full Terms of Service. For now, here is a short summary.'
      : 'Boggan waxa ku jiri doona Shuruudaha Adeegga oo dhamaystiran. Hadda waxa kaliya oo ku jira kooban.'}
  </p>

  <div class="space-y-6 text-gray-300 leading-relaxed">
    <section class="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
      <h2 class="text-white font-bold text-xl mb-2">
        {$lang === 'en' ? 'Using the service' : 'Isticmaalka adeegga'}
      </h2>
      <p>
        {$lang === 'en'
          ? 'Use the service lawfully and provide accurate information when making requests.'
          : 'U isticmaal adeegga si sharci ah, kuna bixi xog sax ah marka aad dalbanayso.'}
      </p>
    </section>

    <section class="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
      <h2 class="text-white font-bold text-xl mb-2">
        {$lang === 'en' ? 'Availability' : 'Helitaanka adeegga'}
      </h2>
      <p>
        {$lang === 'en'
          ? 'We may update, change, or temporarily suspend parts of the service to improve reliability and security.'
          : 'Waxaan beddeli karnaa, cusboonaysiin karnaa ama si ku-meelgaar ah u joojin karnaa qaybo ka mid ah adeegga si loo xoojiyo kalsoonida iyo amniga.'}
      </p>
    </section>

    <section class="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
      <h2 class="text-white font-bold text-xl mb-2">
        {$lang === 'en' ? 'Contact' : 'Nala soo xiriir'}
      </h2>
      <p>
        {$lang === 'en'
          ? 'For questions about these terms, contact us via the Contact page.'
          : 'Haddii aad qabto su’aalo ku saabsan shuruudahan, fadlan nagala soo xiriir bogga Contact.'}
      </p>
    </section>
  </div>
</main>


