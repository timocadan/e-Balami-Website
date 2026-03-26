import { writable } from 'svelte/store';

export type Lang = 'en' | 'so';

// Luqadda Default-ka ah (English)
export const lang = writable<Lang>('en');

// Browser-ka marka uu furmo, hubi wixii horey loo doortay
if (typeof localStorage !== 'undefined') {
    const savedLang = localStorage.getItem('ebalami_lang');
    if (savedLang) {
        if (savedLang === 'en' || savedLang === 'so') {
            lang.set(savedLang);
        }
    }
}

// XALKA ERROR-KA: Waxaanu raaciyay ": string" si uu u fahmo nooca xogta
export const toggleLang = (current: Lang) => {
    const newLang: Lang = current === 'en' ? 'so' : 'en';
    lang.set(newLang);
    localStorage.setItem('ebalami_lang', newLang); 
};