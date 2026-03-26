import { 
    Plane, Wrench, Calendar, Car, 
    Download, MousePointerClick, ShieldCheck, Smartphone, 
    Shield, Lightbulb, Users 
} from 'lucide-svelte';

export const content = {
    // 1. NAVBAR
    navbar: {
        services: { en: "Services", so: "Adeegyada" },
        story: { en: "Our Story", so: "Hadafkayaga" },
        faq: { en: "FAQ", so: "Su'aalo" },
        contact: { en: "Contact Us", so: "Nala soo Xidhiidh" },
        join: { en: "Join Team", so: "Ku Biir Kooxda" },
        download: { en: "Get the App", so: "Soo Degso" }
    },

    // 2. HERO
    hero: {
        badge: { en: "The Future of Service", so: "Mustaqbalka Adeegga Casriga ah" },
        titleStart: { en: "Simplify Your", so: "Hal App ugu wada" },
        titleHighlight: { en: "Life.", so: "Hagaag." },
        subtitleStart: { en: "One App for", so: "baahiyahaaga" },
        subtitleEnd: { en: "Everything.", so: "oo dhan." },
        desc: { 
            en: "e-Balami is the only app you need for premium services.",
            so: "e-Balami waa App-ka kaliya ee aad u baahan tahay si aad u hesho adeegyo heer sare ah."
        }
    },

    // 3. SERVICES
    services: {
        header: { en: "Our Core Services", so: "Adeegyada Aasaasiga Ah" },
        headerProcess: { en: "Process", so: "Hannaanka" },
        subHeader: { 
            en: "Your ultimate ecosystem for daily needs. Simple & Reliable.",
            so: "Hoyga adeegyada maalinlaha ah. Fududeyn & Kalsooni."
        },
        comingSoon: { en: "Coming Soon", so: "Dhawaan Filo" },
        col1Title: { en: "Our Services", so: "Adeegyada" },
        col2Title: { en: "Simple Process", so: "Hab Fudud" },
        items: {
            en: [
                { id: '1', title: 'Medical Travel', description: 'Flights, hospitals, and post-op care in India & Ethiopia.', icon: Plane },
                { id: '2', title: 'Vetted Technicians', description: 'Electricians, plumbers, and mechanics you can trust.', icon: Wrench },
                { id: '3', title: 'Event Management', description: 'Corporate & personal event planning made simple.', icon: Calendar },
                { id: '4', title: 'Car Rentals', description: 'Reliable vehicles for any occasion, anytime.', icon: Car }
            ],
            so: [
                { id: '1', title: 'Safarrada Caafimaadka', description: 'Tikidhada, isbitaallada, iyo daryeelka Hindiya & Itoobiya.', icon: Plane },
                { id: '2', title: 'Farsamoyaqaanno', description: 'Koronto-yaqaanno iyo Tubbooleyaal la hubiyay oo la aamini karo.', icon: Wrench },
                { id: '3', title: 'Qabanqaabada Xafladaha', description: 'Qorsheynta shirarka shirkadaha iyo munaasabadaha gaarka ah.', icon: Calendar },
                { id: '4', title: 'Kirada Gaadiidka', description: 'Gaadiid la isku hallayn karo oo diyaar ku ah waqti kasta.', icon: Car }
            ]
        },
        steps: {
            en: [
                { id: 1, title: 'Download', description: 'Get the App from Stores.', icon: Download },
                { id: 2, title: 'Request', description: 'Choose your service.', icon: MousePointerClick },
                { id: 3, title: 'Relax', description: 'We handle the rest.', icon: ShieldCheck },
                { id: 4, title: 'Enjoy', description: 'Rate your experience.', icon: Smartphone }
            ],
            so: [
                { id: 1, title: 'Soo Degso', description: 'Ka hel App Store/Google Play.', icon: Download },
                { id: 2, title: 'Dalbo', description: 'Dooro adeegga aad u baahan tahay.', icon: MousePointerClick },
                { id: 3, title: 'Iska Naso', description: 'Anagaa inta kale qabanayna.', icon: ShieldCheck },
                { id: 4, title: 'Ku Raaxayso', description: 'Ka faa\'iidayso adeegga casriga ah.', icon: Smartphone }
            ]
        }
    },

    // 4. TRUST 
    trust: {
        titleStart: { en: "Trusted by", so: "Waxaa ku kalsoon" },
        titleHighlight: { en: "The Community", so: "Bulshada" },
        stats: {
            en: [
                { end: 1000, suffix: '+', label: 'Daily Customers' },
                { end: 100, suffix: '+', label: 'Vetted Technicians' },
                { end: 10, suffix: '+', label: 'Major Cities' },
                { end: 5, suffix: '+', label: 'Countries' }
            ],
            so: [
                { end: 1000, suffix: '+', label: 'Macaamiil Maalinle ah' },
                { end: 100, suffix: '+', label: 'Farsamo-yaqaanno' },
                { end: 10, suffix: '+', label: 'Magaalooyin Waaweyn' },
                { end: 5, suffix: '+', label: 'Wadamo' }
            ]
        },
        reviews: {
            en: [
                { name: 'Sarah Jenkins', role: 'Homeowner', quote: "I had a plumbing emergency at 2 AM. e-Balami connected me with a verified plumber within minutes. The peace of mind is priceless.", image: 'https://picsum.photos/seed/sarah/100/100' },
                { name: 'Dr. A. Mensah', role: 'Medical Tourist', quote: "Managing my surgery abroad was daunting until I found e-Balami. They handled the logistics, allowing me to focus on my recovery.", image: 'https://picsum.photos/seed/mensah/100/100' },
                { name: 'James K.', role: 'Event Organizer', quote: "As a beta tester, I'm blown away. This level of professional service aggregation is exactly what the market needed.", image: 'https://picsum.photos/seed/james/100/100' }
            ],
            so: [
                { name: 'Sarah Jenkins', role: 'Mulkiile Guri', quote: "Waxaan u baahday Tuuboole saacadu markay ahayd 2-dii habeenimo. e-Balami ayaa daqiiqado gudahood iigu keentay xirfadle. Waa nasasho dhab ah.", image: 'https://picsum.photos/seed/sarah/100/100' },
                { name: 'Dr. A. Mensah', role: 'Bukaan Dibadda', quote: "Qalliinkaygii Hindiya aad buu iigu adkaa ilaa aan helay e-Balami. Wax walba ayagaa agaasimay, aniguna caafimaadkaygaan xoogga saaray.", image: 'https://picsum.photos/seed/mensah/100/100' },
                { name: 'James K.', role: 'Qabanqaabiye', quote: "Aad baan u la dhacay nidaamkan. Adeegyadan oo hal meel kuwada jira waana mid aad looga baahnaa suuqa geeska Afrika.", image: 'https://picsum.photos/seed/james/100/100' }
            ]
        }
    },

    // 5. MISSION
    mission: {
        titleStart: { en: "Our", so: "Sheekadeena," },
        titleHighlight: { en: "Story", so: "Kalsoonidaada" },
        leftCardTitle: { en: "Our Mission:", so: "Hadafkayaga:" },
        leftCardHighlight: { en: "A Life Without Hassle.", so: "Nolosha oo dhib la'aan ah." },
        leftCardDesc: {
            en: "e-Balami was founded on a simple principle: to remove the stress and uncertainty from essential services. We bring trust, transparency, and technology together.",
            so: "e-Balami waxaa lagu aasaasay mabda' fudud: Kaas oo ah inaan meesha ka saarno walwalka iyo hubanti la'aanta adeegyada daruuriga ah. Waxaan dhiseynaa kalsooni anagoo ka faa'iideysaneyna Tiknoolojiyada."
        },
        points: {
            en: ["Verified Professionals", "Transparent Pricing", "24/7 Support", "Secure Payments"],
            so: ["Xirfadlayaal la Hubiyay", "Qiimo Cad", "Caawinaad 24 ka saac ah", "Lacag-bixin Sugan"]
        },
        rightTitle: { en: "The Values That Drive Us", so: "Qiyamka Ina Haga" },
        values: {
            en: [
                { icon: Shield, title: "Trust", desc: "We build confidence at every step." },
                { icon: Lightbulb, title: "Innovation", desc: "Constantly seeking better ways." },
                { icon: Users, title: "Customer-Centric", desc: "You are at the core of everything." }
            ],
            so: [
                { icon: Shield, title: "Kalsooni", desc: "Tallaabo kasta waa mid aamin ah." },
                { icon: Lightbulb, title: "Hal-abuur", desc: "Si joogto ah u raadinta hormar." },
                { icon: Users, title: "Danaha Macmiilka", desc: "Adiga ayaa ah udub-dhexaadkeena." }
            ]
        }
    },

    // 6. FINAL CTA
    cta: {
        title: { en: "Ready to Simplify Your Life?", so: "Diyaar Ma u Tahay Nolol Fudud?" },
        desc: { 
            en: "Join thousands of users who have upgraded their lifestyle. Download the e-Balami app today and experience the difference.",
            so: "Ku biir kumanaan qof oo noloshooda hormariyay. Soo degso isla maantaba App-ka casriga ah ee Shirkada e-Balami."
        },
        appStore: { en: "App Store", so: "App Store" },
        googlePlay: { en: "Google Play", so: "Google Play" },
        iosComingSoon: { 
            en: "Coming Soon", 
            so: "Dhawaan Filo" 
        },
        iosComingSoonDesc: { 
            en: "The iOS app is coming soon, but you can get it on Google Play Store now!", 
            so: "App-ka Iphone-ka dhawaan filo, laakiin waxaad hadda ka heli kartaa Google Play Store!" 
        },
        getPlayStore: { 
            en: "Get on Play Store", 
            so: "Ka Hel Play Store" 
        },
        close: { 
            en: "Close", 
            so: "Xidh" 
        }
    },

    // 7. CONTACT PAGE (KANI WAA KII CUSBAA OO WAA INAAT KU DARTO)
    contactPage: {
        titleStart: { en: "Get in", so: "Nala" },
        titleHighlight: { en: "Touch", so: "Xiriir" },
        desc: { en: "Have a question or need assistance? We are here to help you 24/7.", so: "Ma qabtaa su'aal ama caawinaad? Halkan ayaan u joognaa 24/7." },
        phoneTitle: { en: "Phone & WhatsApp", so: "Taleefan & WhatsApp" },
        phoneDesc: { en: "Mon-Fri from 8am to 5pm.", so: "Isniin-Jimco 8da subaxnimo - 5ta galabnimo." },
        officeLabel: { en: "Office Landline", so: "Telefoonka Xafiiska" },
        whatsappLabel: { en: "WhatsApp Support", so: "Taageerada WhatsApp" },
        
        emailTitle: { en: "Email Support", so: "Email" },
        emailDesc: { en: "We typically reply within 2 hours.", so: "Waxaan ku soo jawaabnaa 2 saac gudahood." },
        
        hqTitle: { en: "Our Headquarters", so: "Xarunta Dhexe" },
        hqDesc: { 
            en: "Fourth floor of the Burji Hasan Wali, Nearby Araarso Hotel, Jigjiga, Somali Regional State.",
            so: "Dabaqa 4-aad ee Burji Xasan Wali, Hotel Araarso Agtiisa, Jigjiga, Degaanka Soomaalida." 
        },
        
        formTitle: { en: "Send us a message", so: "Noo soo dir fariin" },
        labelName: { en: "Your Name", so: "Magacaaga" },
        labelPhone: { en: "Phone Number", so: "Lambar Telefoon" },
        labelEmail: { en: "Email Address", so: "Email-kaaga" },
        labelSubject: { en: "Subject", so: "Ciwaanka" },
        labelMessage: { en: "Message", so: "Fariintaada" },
        btnSend: { en: "Send Message", so: "Dir Fariinta" }
    },

    // 8. FAQ
    faq: {
        badge: { en: "Common Questions", so: "Su'aalaha Caadiga ah" },
        titleStart: { en: "Frequently Asked", so: "Waxa Badanaa La" },
        titleHighlight: { en: "Questions", so: "Isweydiiyo" },
        subtitle: { en: "Check these before downloading the App.", so: "Hubi inta aadan soo degsan App-ka." },
        items: {
            en: [
                { question: "How does Medical Travel work?", answer: "It's simple. You choose the country and hospital via App. We handle booking, visa letters, and logistics." },
                { question: "Are technicians trustworthy?", answer: "Yes, 100%. Every technician undergoes a background check and is registered." },
                { question: "Payment methods?", answer: "We accept Telebirr, CBE Birr, and Bank Transfers for secure payments." },
                { question: "What about refunds?", answer: "We have a strict Refund Policy and 24/7 support to resolve issues." }
            ],
            so: [
                { question: "Sidee u shaqeeyaan Safarrada Caafimaadku?", answer: "App-ka ayaad ka dalbanaysaa. Anagaa kuu ballaminayna dhakhtarka, Viisada, iyo huteelka." },
                { question: "Farsamo-yaqaanada ma la aamini karaa?", answer: "Haa, 100%. Farsamo-yaqaan kasta waa la hubiyay (Background Check) waana diiwaangashan yahay." },
                { question: "Lacag bixintu sidee waaye?", answer: "Waxaad isticmaali kartaa Telebirr, CBE Birr, iyo Bank Transfer." },
                { question: "Haddii aanan ku qancin adeegga?", answer: "Waxaan leenahay nidaam Lacag-celin (Refund Policy) iyo xarun cabasho oo 24/7 shaqaysa." }
            ]
        }
    },
    
    footer: {
        tagline: { 
            en: "The premium all-in-one platform for your lifestyle, medical, and technical needs.", 
            so: "Madal casri ah oo kulmisay xalka baahiyahaaga nololeed, Hadey tahay mid caafimaad iyo mid farsamoba." 
        },
        headings: {
            nav: { en: "Navigation", so: "Boggaga" },
            contact: { en: "Contact Us", so: "Nagala soo Xidhiidh" }
        },
        profileText: {
            en: "For partners, investors, or media inquiries, learn more about our company here:",
            so: "Bah-wadaagta, maalgashadayaasha, ama warbaahinta, waxaad halkan ka heli kartaan macluumaad dheeri ah oo ku saabsan shirkadda:"
        },
        profileButton: {
            en: "Download our Business Profile",
            so: "Soo Degso Profile-ka Shirkadda"
        }
    }
};