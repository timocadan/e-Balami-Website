<script>
    import FadeIn from '$lib/components/FadeIn.svelte';
    import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-svelte';
    
    // Import Translations
    import { lang } from '$lib/stores/lang';
    import { content } from '$lib/data/translations';
</script>

<div class="pt-36 pb-20 bg-[#121212] min-h-screen">
    <div class="max-w-7xl mx-auto px-6">
        
        <!-- Header (Translated) -->
        <div class="text-center mb-16">
            <FadeIn>
                <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-4">
                    {content.contactPage.titleStart[$lang]} <span class="text-[#FFC107]">{content.contactPage.titleHighlight[$lang]}</span>
                </h1>
                <p class="text-gray-400 max-w-2xl mx-auto text-base">
                    {content.contactPage.desc[$lang]}
                </p>
            </FadeIn>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            
            <!-- CONTACT INFO & MAP (Translated) -->
            <div>
                <FadeIn delay={200}>
                    <div class="space-y-6">
                        
                        <!-- Contact Card 1 -->
                        <div class="bg-[#181818] p-5 rounded-xl border border-gray-800 hover:border-[#FFC107]/50 transition-colors flex items-start gap-4">
                            <div class="w-10 h-10 bg-[#FFC107]/10 rounded-full flex items-center justify-center text-[#FFC107] shrink-0">
                                <Phone size={20} />
                            </div>
                            <div class="flex flex-col gap-4 w-full">
                                <div class="border-b border-gray-800 pb-3">
                                    <h3 class="text-gray-400 text-xs font-bold uppercase mb-1">{content.contactPage.officeLabel[$lang]}</h3>
                                    <a href="tel:+251252788887" class="text-white hover:text-[#FFC107] font-semibold block transition-colors text-sm">
                                        025 278 8887
                                    </a>
                                </div>
                                <div>
                                    <h3 class="text-gray-400 text-xs font-bold uppercase mb-1">{content.contactPage.whatsappLabel[$lang]}</h3>
                                    <a href="https://wa.me/251991301950" target="_blank" class="flex items-center gap-2 text-white hover:text-[#FFC107] font-semibold transition-colors text-sm">
                                        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" class="text-[#FFC107]">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                        </svg>
                                        Chat on WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>

                        <!-- Contact Card 2: Email -->
                        <div class="bg-[#181818] p-5 rounded-xl border border-gray-800 flex items-start gap-4 hover:border-[#FFC107]/50 transition-colors">
                            <div class="w-10 h-10 bg-[#FFC107]/10 rounded-full flex items-center justify-center text-[#FFC107] shrink-0">
                                <Mail size={20} />
                            </div>
                            <div>
                                <h3 class="text-white font-bold text-base mb-1">{content.contactPage.emailTitle[$lang]}</h3>
                                <p class="text-gray-400 text-xs mb-1">{content.contactPage.emailDesc[$lang]}</p>
                                <a href="mailto:ebalamiservices@gmail.com" class="text-white hover:text-[#FFC107] font-semibold block transition-colors text-sm">ebalamiservices@gmail.com</a>
                            </div>
                        </div>

                        <!-- Contact Card 3: Address -->
                        <div class="bg-[#181818] p-5 rounded-xl border border-gray-800 flex items-start gap-4 hover:border-[#FFC107]/50 transition-colors">
                            <div class="w-10 h-10 bg-[#FFC107]/10 rounded-full flex items-center justify-center text-[#FFC107] shrink-0">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <h3 class="text-white font-bold text-base mb-1">{content.contactPage.hqTitle[$lang]}</h3>
                                <p class="text-gray-400 text-sm leading-relaxed">
                                    {content.contactPage.hqDesc[$lang]}
                                </p>
                            </div>
                        </div>

                    </div>
                </FadeIn>
            </div>

            <!-- FORM SIDE (ACTIVE & TRANSLATED) -->
            <div class="bg-[#181818] p-6 md:p-8 rounded-2xl border border-gray-800 shadow-xl">
                <FadeIn delay={300}>
                    <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <MessageSquare class="text-[#FFC107]" size={20} /> 
                        {content.contactPage.formTitle[$lang]}
                    </h3>
                    
                    <!-- FUNCTIONAL FORM using FormSubmit.co -->
                    <form 
                        action="https://formsubmit.co/ebalamiservices@gmail.com" 
                        method="POST" 
                        class="space-y-4"
                    >
                        <input type="text" name="_honey" style="display:none">
                        <input type="hidden" name="_next" value="https://ebalami.com/contact">
                        <input type="hidden" name="_captcha" value="false">

                        <!-- SAFKA 1: Name & Phone -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-gray-400 text-xs font-medium mb-1" for="name">{content.contactPage.labelName[$lang]}</label>
                                <input type="text" name="name" required class="w-full bg-[#121212] border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#FFC107] transition-colors" />
                            </div>
                            <div>
                                <label class="block text-gray-400 text-xs font-medium mb-1" for="phone">{content.contactPage.labelPhone[$lang]}</label>
                                <input type="tel" name="phone" required class="w-full bg-[#121212] border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#FFC107] transition-colors" />
                            </div>
                        </div>

                        <!-- SAFKA 2: Email (MUHIIM U AH REPLY) -->
                        <div>
                            <label class="block text-gray-400 text-xs font-medium mb-1" for="email">{content.contactPage.labelEmail[$lang]}</label>
                            <!-- Magaca 'name="email"' ayaa furaaya awooda Reply-ga -->
                            <input type="email" name="email" required class="w-full bg-[#121212] border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#FFC107] transition-colors" placeholder="email@example.com" />
                        </div>

                        <!-- SAFKA 3: Subject -->
                        <div>
                            <label class="block text-gray-400 text-xs font-medium mb-1" for="subject">{content.contactPage.labelSubject[$lang]}</label>
                            <select name="subject" class="w-full bg-[#121212] border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#FFC107] transition-colors">
                                <option>General Inquiry</option>
                                <option>Medical Travel Help</option>
                                <option>Technician Service</option>
                                <option>Partnership</option>
                            </select>
                        </div>

                        <!-- SAFKA 4: Message -->
                        <div>
                            <label class="block text-gray-400 text-xs font-medium mb-1" for="message">{content.contactPage.labelMessage[$lang]}</label>
                            <textarea name="message" required rows="4" class="w-full bg-[#121212] border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#FFC107] transition-colors"></textarea>
                        </div>

                        <button type="submit" class="w-full bg-[#FFC107] text-black font-bold py-3 rounded-full flex items-center justify-center gap-2 hover:bg-yellow-400 transform hover:scale-[1.01] transition-all text-sm mt-2">
                            {content.contactPage.btnSend[$lang]}
                            <Send size={16} />
                        </button>
                    </form>
                </FadeIn>
            </div>

        </div>
    </div>
</div>