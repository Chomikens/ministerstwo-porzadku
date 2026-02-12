"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "pl" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  pl: {
    // Navigation
    "nav.about": "O\u00A0mnie",
    "nav.services": "Usługi / Cennik",
    "nav.process": "Proces",
    "nav.transformations": "Realizacje",
    "nav.testimonials": "Opinie",
    "nav.ebooks": "Ebooki", // Added ebooks navigation translation
    "nav.contact": "Kontakt",
    "nav.faq": "FAQ",
    "nav.cta": "Umów konsultację",

    // Breadcrumbs
    "breadcrumbs.home": "Strona g\u0142\u00F3wna",
    "breadcrumbs.label": "Nawigacja okruszkowa",
    "breadcrumbs.services": "Us\u0142ugi",
    "breadcrumbs.blog": "Blog",
    "breadcrumbs.category": "Kategoria",
    "breadcrumbs.privacyPolicy": "Polityka Prywatno\u015Bci",
    "breadcrumbs.faq": "FAQ",

    // 404 Page
    "notFound.code": "404",
    "notFound.title": "Strona nie została znaleziona",
    "notFound.subtitle": "Ups! Strona, której szukasz, nie istnieje.",
    "notFound.description": "Być może została przeniesiona lub usunięta. Sprawdź adres URL lub wróć do strony głównej.",
    "notFound.home": "Strona główna",
    "notFound.services": "Nasze usługi",
    "notFound.contact": "Kontakt",

    // Hero
    "hero.badge": "Profesjonalna organizacja przestrzeni",
    "hero.tagline": "Twój spokój zaczyna się tutaj.",
    "hero.title": "Twój spokój zaczyna się tutaj.",
    "hero.description.brand": "Ministerstwo Porządku",
    "hero.description.rest":
      "to więcej niż organizacja przestrzeni. To sposób na odzyskanie równowagi — w\u00A0domu, w\u00A0myślach, w\u00A0codzienności.",
    "hero.description2": "Bo kiedy wokół panuje porządek, łatwiej znaleźć spokój w\u00A0sobie.",
    "hero.company.description":
      "Ministerstwo Porządku to przestrzeń stworzona z\u00A0potrzeby życia w\u00A0harmonii. Pomagam osobom, które prowadzą intensywne życie – łącząc obowiązki zawodowe, rodzinne i\u00A0osobiste – odzyskać kontrolę nad otoczeniem poprzez przemyślaną organizację przestrzeni. Oferuję usługi projektowej organizacji przestrzeni, declutteringu, konsultacje online oraz kompleksową organizację przeprowadzki – od A\u00A0do Z. Wierzę, że porządek to nie cel sam w\u00A0sobie, lecz sposób na lżejsze, spokojniejsze i\u00A0bardziej świadome życie. Ministerstwo Porządku to marka, której misją jest pomóc Ci stworzyć przestrzeń, która naprawdę będzie Cię wspierać.",
    "hero.company.seeMore": "Zobacz więcej",
    "hero.company.seeLess": "Zobacz mniej",
    "hero.cta.primary": "Umów konsultację",
    "hero.cta.secondary": "Poznaj moje usługi",
    "hero.stats.clients": "Zadowolonych klientów",
    "hero.stats.spaces": "Zorganizowanych przestrzeni",
    "hero.stats.experience": "Lat doświadczenia",
    "hero.testimonial": "Moją misją jest pomóc Ci stworzyć przestrzeń, która będzie Cię wspierać",
    "hero.testimonial.author": "Karolina Kalinowska",

    // About
    "about.badge": "Poznaj mnie",
    "about.quote": "Moją misją jest pomóc Ci stworzyć przestrzeń, która będzie Cię wspierać",
    "about.quoteName": "Karolina Kalinowska",
    "about.name": "Karolina Kalinowska",
    "about.role": "Założycielka Ministerstwa Porządku",
    "about.bio1":
      "Jestem profesjonalną organizatorką przestrzeni i\u00A0specjalistką od declutteringu. Pomagam ludziom odzyskać kontrolę nad swoim otoczeniem i\u00A0stworzyć przestrzenie, które wspierają ich codzienne życie.",
    "about.bio2":
      "Wierzę, że porządek to nie tylko estetyka, ale przede wszystkim funkcjonalność i\u00A0spokój umysłu. Każda przestrzeń ma potencjał, aby stać się miejscem harmonii i\u00A0efektywności.",
    "about.bio3":
      "Moje podejście łączy praktyczne rozwiązania z\u00A0empatią i\u00A0zrozumieniem dla indywidualnych potrzeb każdego klienta. Pracuję z\u00A0osobami prywatnymi oraz firmami, tworząc systemy organizacji dostosowane do ich stylu życia i\u00A0pracy.",
    "about.credentials": "Kwalifikacje i\u00A0doświadczenie",
    "about.credential1": "Certyfikat ukończenia kursu Architektury Porządku u Agnieszki Witkowskiej",
    "about.credential2": "Ponad 5\u00A0lat doświadczenia w\u00A0organizacji przestrzeni",
    "about.credential3": "Ponad 200 zrealizowanych projektów",
    "about.credential4": "Specjalizacja w\u00A0declutteringu i\u00A0minimalizmie",

    // Services
    "services.badge": "Kompleksowe rozwiązania",
    "services.title": "Moje usługi",
    "services.subtitle":
      "Oferuję kompleksowe rozwiązania dostosowane do Twoich potrzeb. Każda przestrzeń zasługuje na harmonię.",
    "services.cta": "Zobacz szczegóły",
    "services.includes": "Co obejmuje usługa",
    "services.starting": "Cena od",
    "services.book": "Umów konsultację",
    "services.details": "Szczegóły usługi",
    "services.forWhom": "Dla kogo",

    "services.home.badge": "Najpopularniejsze",
    "services.home.title": "Projektowa organizacja przestrzeni",
    "services.home.description":
      "Funkcjonalny dom zaczyna się od przemyślanego projektu. Usługa projektowej organizacji przestrzeni to połączenie wiedzy o\u00A0ergonomii, funkcjonalności i\u00A0organizacji. Pomagam stworzyć wnętrze, w\u00A0którym wszystko ma swoje miejsce — już na etapie projektu lub zaraz po wprowadzeniu się. Dzięki temu unikasz bałaganu, chaosu i\u00A0nietrafionych rozwiązań.",
    "services.home.details":
      "To kompleksowy proces, który łączy analizę potrzeb, dopasowanie przestrzeni do stylu życia domowników oraz praktyczne rozwiązania organizacyjne. Pracuję zarówno z\u00A0osobami, które dopiero projektują swoje wnętrza, jak i\u00A0z\u00A0tymi, którzy mieszkają już w\u00A0nowym domu, ale czują, że coś nie działa. Każdy projekt to indywidualne podejście — opieram się na codziennych nawykach, rytmie życia i\u00A0realnych potrzebach klientów.",
    "services.home.feature1": "Konsultacja i\u00A0analiza przestrzeni",
    "services.home.feature2": "Moodboard i\u00A0koncepcja organizacji",
    "services.home.feature3": "Projekt organizacji przestrzeni",
    "services.home.feature4": "Lista zakupowa i\u00A0realizacja",
    "services.home.price": "Wycena indywidualna",

    "services.office.badge": "Kompleksowa",
    "services.office.title": "Decluttering i\u00A0organizacja przestrzeni",
    "services.office.description":
      "Nowy porządek, nowa energia, nowa przestrzeń. To kompleksowa usługa, która łączy decluttering – proces pozbywania się nadmiaru rzeczy z\u00A0uważnością i\u00A0wsparciem – oraz organizację przestrzeni, czyli dopasowanie najbardziej funkcjonalnych rozwiązań organizacyjnych indywidualnie do Ciebie, Twoich potrzeb, Twoich rzeczy i\u00A0Twojej przestrzeni. Pomagam uporządkować dom lub biuro tak, aby codzienność stała się prostsza, spokojniejsza i\u00A0bardziej funkcjonalna.",
    "services.office.details":
      "Podczas współpracy łączę praktyczne rozwiązania z\u00A0empatią do procesu zmian. Decluttering to nie tylko porządkowanie rzeczy — to również praca z\u00A0emocjami, decyzjami i\u00A0nawykami. Organizacja przestrzeni to kolejny krok: stworzenie przemyślanego systemu, który ułatwia utrzymanie porządku na co dzień. Pracujemy w\u00A0Twoim tempie, z\u00A0pełnym wsparciem fizycznym, emocjonalnym i\u00A0doradczym.",
    "services.office.forWhom":
      "Dla osób, które czują, że bałagan odbiera im spokój i\u00A0energię. Dla tych, którzy chcą zacząć od nowa – świadomie i\u00A0funkcjonalnie. Dla właścicieli domów, mieszkań i\u00A0biur, którzy potrzebują lepszej organizacji przestrzeni. Dla osób, które potrzebują wsparcia w\u00A0procesie porządkowania – zarówno praktycznego, jak i\u00A0emocjonalnego.",
    "services.office.feature1": "Konsultacja i\u00A0diagnoza przestrzeni",
    "services.office.feature2": "Plan działania i\u00A0przygotowanie",
    "services.office.feature3": "Proces declutteringu",
    "services.office.feature4": "Proces organizacji przestrzeni",
    "services.office.price": "Wycena indywidualna",

    "services.moving.badge": "Pełne wsparcie",
    "services.moving.title": "Wsparcie w\u00A0Przeprowadzce",
    "services.moving.description":
      "Twój nowy początek w\u00A0perfekcyjnie zorganizowanej przestrzeni. To kompleksowa usługa, która łączy decluttering, pakowanie, koordynację przeprowadzki i\u00A0pełną organizację przestrzeni w\u00A0nowym domu. Ty zajmujesz się swoim życiem – ja sprawiam, że Twój nowy dom jest gotowy do zamieszkania, dopracowany w\u00A0każdym detalu.",
    "services.moving.details":
      "Zaczynamy od declutteringu — selekcji i\u00A0uporządkowania rzeczy, które pozostają w\u00A0Twoim nowym domu, aby przestrzeń była lekka i\u00A0funkcjonalna. Następnie zajmuję się pakowaniem w\u00A0sposób logiczny i\u00A0systematyczny, tak aby rozpakowanie w\u00A0nowym domu było szybkie i\u00A0bezstresowe. Podczas całej przeprowadzki zapewniam koordynację działań, a\u00A0w\u00A0nowym domu tworzę funkcjonalny system organizacji dopasowany do Twojego stylu życia i\u00A0codziennego rytmu.",
    "services.moving.forWhom":
      "Dla osób, które chcą przeprowadzić się sprawnie i\u00A0bez stresu. Dla tych, którzy nie chcą samodzielnie zajmować się logistyką, pakowaniem i\u00A0rozpakowywaniem. Dla rodzin lub osób zapracowanych, które potrzebują wsparcia w\u00A0całym procesie przeprowadzki. Dla każdego, kto chce, aby nowy dom był od razu uporządkowany i\u00A0funkcjonalny.",
    "services.moving.feature1": "Decluttering i\u00A0przygotowanie przestrzeni do przeprowadzki",
    "services.moving.feature2": "Plan i\u00A0koordynacja przeprowadzki",
    "services.moving.feature3": "Pakowanie i\u00A0oznaczanie rzeczy",
    "services.moving.feature4": "Rozpakowanie i\u00A0organizacja w\u00A0nowym domu",
    "services.moving.price": "Wycena indywidualna",

    "services.online.badge": "Elastyczna",
    "services.online.title": "Konsultacja online / stacjonarnie",
    "services.online.description":
      "Zaplanowana przestrzeń, którą możesz wdrożyć samodzielnie. Usługa pozwala opracować funkcjonalny plan organizacji przestrzeni, dopasowany do Twoich potrzeb i\u00A0rytmu życia, który możesz samodzielnie wdrożyć w\u00A0swoim domu lub biurze.",
    "services.online.details":
      "Podczas konsultacji analizujemy Twoją przestrzeń i\u00A0codzienne potrzeby użytkowników. Tworzę propozycje funkcjonalnych rozwiązań, które poprawią ergonomię i\u00A0komfort korzystania z\u00A0przestrzeni. Efektem jest plan działania, który możesz wdrożyć samodzielnie, krok po kroku, z\u00A0praktycznymi wskazówkami dotyczącymi organizacji, przechowywania i\u00A0optymalizacji układu wnętrza.",
    "services.online.forWhom":
      "Dla osób, które chcą samodzielnie wprowadzić zmiany w\u00A0swoim wnętrzu, ale potrzebują fachowego wsparcia przy planowaniu. Dla tych, którzy chcą optymalnie wykorzystać przestrzeń i\u00A0poprawić funkcjonalność pomieszczeń. Dla właścicieli domów, mieszkań lub biur, którzy szukają praktycznych, dopasowanych rozwiązań bez kompleksowej realizacji usługi.",
    "services.online.feature1": "Konsultację online lub stacjonarną",
    "services.online.feature2": "Analizę układu wnętrza i\u00A0codzienne nawyków użytkowników",
    "services.online.feature3": "Propozycje funkcjonalnych rozwiązań i\u00A0optymalizacji przestrzeni",
    "services.online.feature4": "Plan działania do samodzielnego wdrożenia",
    "services.online.price": "1500 zł",

    // Ebooks
    "ebooks.badge": "Sklep z\u00A0ebookami",
    "ebooks.title": "Ebooki",
    "ebooks.subtitle":
      "Praktyczne przewodniki, które pomogą Ci w\u00A0organizacji przestrzeni. Pobierz natychmiast po zakupie.",
    "ebooks.pages": "stron",
    "ebooks.format": "Format",
    "ebooks.viewDetails": "Zobacz szczegóły",
    "ebooks.samplePages": "Przykładowe strony",
    "ebooks.instant": "Natychmiast",
    "ebooks.download": "Pobierz",
    "ebooks.whatYouGet": "Co otrzymasz",
    "ebooks.buyNow": "Wkrótce dostępne",
    "ebooks.securePayment": "Bezpieczna płatność przez Stripe",
    "ebooks.backToDetails": "Wróć do szczegółów",

    // Testimonials
    "testimonials.title": "Opinie klientów",
    "testimonials.subtitle": "Zobacz, co mówią o\u00A0mnie klienci. Każda opinia to historia transformacji.",

    "testimonials.client1.name": "Anna Kowalska",
    "testimonials.client1.location": "Warszawa, Mokotów",
    "testimonials.client1.text":
      "Ministerstwo Porządku całkowicie zmieniło moje podejście do organizacji domu. Po ich wizycie moja garderoba wygląda jak z\u00A0magazynu, a\u00A0co najważniejsze - utrzymanie porządku jest teraz proste i\u00A0przyjemne. Polecam z\u00A0całego serca!",

    "testimonials.client2.name": "Piotr Nowak",
    "testimonials.client2.location": "Kraków, Stare Miasto",
    "testimonials.client2.text":
      "Jako właściciel małej firmy potrzebowałem pomocy w\u00A0organizacji biura. Efekt przeszedł moje najśmielsze oczekiwania - produktywność wzrosła, a\u00A0stres związany z\u00A0szukaniem dokumentów zniknął. Profesjonalizm na najwyższym poziomie.",

    "testimonials.client3.name": "Magdalena Wiśniewska",
    "testimonials.client3.location": "Gdańsk, Oliwa",
    "testimonials.client3.text":
      "Przeprowadzka z\u00A0pomocą Ministerstwa Porządku była najlepszą decyzją. Zamiast chaosu i\u00A0stresu, otrzymałam profesjonalne wsparcie na każdym etapie. W\u00A0nowym mieszkaniu od pierwszego dnia wszystko było na swoim miejscu. Nieoceniona pomoc!",

    "testimonials.client4.name": "Tomasz Lewandowski",
    "testimonials.client4.location": "Wrocław, Krzyki",
    "testimonials.client4.text":
      "Konsultacja online okazała się strzałem w\u00A0dziesiątkę. Mimo że mieszkam daleko od Warszawy, otrzymałem pełne wsparcie i\u00A0szczegółowy plan organizacji mojego home office. Wszystko jasne, konkretne i\u00A0łatwe do wdrożenia. Gorąco polecam!",

    "testimonials.client5.name": "Karolina Zielińska",
    "testimonials.client5.location": "Poznań, Grunwald",
    "testimonials.client5.text":
      "Konsultacje online to świetne rozwiązanie dla zabieganych osób. Otrzymałam szczegółowy plan organizacji kuchni i\u00A0łazienki, który mogłam wdrożyć we własnym tempie. Wsparcie przez email było nieocenione. Moja przestrzeń teraz oddycha!",

    "testimonials.client6.name": "Michał Dąbrowski",
    "testimonials.client6.location": "Łódź, Bałuty",
    "testimonials.client6.text":
      "Organizacja biura w\u00A0naszej firmie była wyzwaniem. Ministerstwo Porządku stworzyło system, który działa perfekcyjnie dla całego zespołu. Dokumenty są łatwo dostępne, przestrzeń jest funkcjonalna, a\u00A0atmosfera pracy znacznie się poprawiła.",

    // Process
    "process.title": "Jak pracuję",
    "process.subtitle":
      "Mój sprawdzony proces gwarantuje sukces. Każdy krok jest przemyślany i\u00A0dostosowany do Twoich potrzeb.",
    "process.seeHowIWork": "Zobacz jak pracuję",
    "process.step1.title": "Konsultacja",
    "process.step1.description":
      "Poznaję Twoje potrzeby, analizuję przestrzeń i\u00A0ustalamy cele. Bezpłatna wstępna rozmowa.",
    "process.step2.title": "Plan działania",
    "process.step2.description":
      "Tworzę szczegółowy plan organizacji dostosowany do Twojego stylu życia i\u00A0budżetu.",
    "process.step3.title": "Realizacja",
    "process.step3.description":
      "Wspólnie organizujemy przestrzeń, uczę systemów i\u00A0pomagam w\u00A0selekcji rzeczy.",
    "process.step4.title": "Wsparcie",
    "process.step4.description": "Pozostaję w\u00A0kontakcie, aby upewnić się, że nowe nawyki się utrwalają.",

    // Transformation
    "transformation.title": "Realizacje",
    "transformation.subtitle": "Zobacz, jak przekształcam przestrzenie. Każdy projekt to unikalna historia zmiany.",
    "transformation.badge": "Moje projekty",
    "transformation.photoAlt": "Zorganizowana przestrzeń",
    "transformation.previous": "Poprzednia realizacja",
    "transformation.next": "Następna realizacja",
    "transformation.goTo": "Przejdź do realizacji",
    "transformation.wardrobe.title": "Garderoba",
    "transformation.wardrobe.location": "Warszawa październik 2025",
    "transformation.wardrobe.description": "Funkcjonalna organizacja garderoby",
    "transformation.wardrobe.details":
      "Kompleksowa organizacja garderoby z\u00A0przemyślanym systemem przechowywania. Uporządkowane ubrania na wieszakach, złożone swetry na półkach oraz zorganizowane torebki i\u00A0akcesoria. Każda rzecz ma swoje miejsce, co ułatwia codzienne poranne przygotowania i\u00A0utrzymanie porządku.",
    "transformation.kitchen1.title": "Kuchnia",
    "transformation.kitchen1.location": "Łuków wrzesień 2025",
    "transformation.kitchen1.description": "Od chaosu do funkcjonalnej przestrzeni",
    "transformation.kitchen1.details":
      "W tej kuchni zadbałam o łatwy dostęp do produktów suchych, zwłaszcza śniadaniowych, dzięki czemu najmłodsi mogą samodzielnie przygotować sobie poranny posiłek. Przemyślany układ szafek i szuflad sprawia, że wszystko ma swoje miejsce, a porządek utrzymuje się naturalnie.",
    "transformation.kitchen2.title": "Kuchnia",
    "transformation.kitchen2.location": "Warszawa luty 2025",
    "transformation.kitchen2.description": "Nowa przestrzeń zaczyna się od harmonii",
    "transformation.kitchen2.details":
      "W tym projekcie priorytetem były dobrze zaplanowane szuflady na przyprawy i zapasy suche – dzięki nim porządek stał się naturalny, a wszystko jest dokładnie tam, gdzie powinno być. Klient zyskał nową, harmonijną przestrzeń, w której estetyka idzie w parze z funkcjonalnością.",
    "transformation.office.title": "Biuro domowe",
    "transformation.office.description": "Z\u00A0bałaganu do produktywnej przestrzeni",
    "transformation.office.details":
      "Przekształciłam zagracone biuro domowe w\u00A0funkcjonalną przestrzeń do pracy. System archiwizacji dokumentów, uporządkowane biurko i\u00A0przemyślane rozwiązania przechowywania materiałów biurowych zwiększyły produktywność o\u00A040%. Klient zyskał nie tylko piękną przestrzeń, ale przede wszystkim więcej czasu i\u00A0mniej stresu.",
    "transformation.ebooks.title": "Ebooki",
    "transformation.ebooks.description": "Praktyczne przewodniki do organizacji przestrzeni",
    "transformation.ebooks.details":
      "Ebooki zawierają praktyczne poradniki, które pomogą Ci w\u00A0organizacji przestrzeni. Możesz je natychmiast pobrać po zakupie.",
    "transformation.contact.title": "Kontakt",
    "transformation.contact.description": "Skontaktuj się ze mną, aby umówić konsultację",
    "transformation.contact.details":
      "Możesz skontaktować się ze mną poprzez formularz kontaktowy lub mailowo. Odpowiem Ci jak najszybciej.",
    "transformation.about.title": "O\u00A0mnie",
    "transformation.about.description": "Pasjonatka organizacji przestrzeni i\u00A0minimalizmu",
    "transformation.about.details":
      "Tworzę przestrzenie, które harmonizują codzienność, wspierają koncentrację, poprawiają samopoczucie i\u00A0pozwalają w\u00A0pełni korzystać z\u00A0życia.",
    "transformation.process.title": "Jak pracuję",
    "transformation.process.description": "Mój sprawdzony proces gwarantuje sukces",
    "transformation.process.details":
      "Każdy krok jest przemyślany i\u00A0dostosowany do Twoich potrzeb. Poznaję Twoje potrzeby, analizuję przestrzeń i\u00A0ustalamy cele.",
    "transformation.stats.title": "Statystyki",
    "transformation.stats.description": "Moje osiągnięcia w organizacji przestrzeni",
    "transformation.stats.details":
      "Zadowolonych klientów, zorganizowanych przestrzeni, lat doświadczenia. Wierzę, że porządek to sposób na lżejsze, spokojniejsze i\u00A0bardziej świadome życie.",

    // Contact
    "contact.title": "Skontaktuj się ze mną",
    "contact.subtitle": "Umów bezpłatną konsultację i\u00A0rozpocznij swoją transformację przestrzeni",
    "contact.phone": "Telefon",
    "contact.location": "Lokalizacja",
    "contact.online": "Konsultacje online dostępne w\u00A0całej Polsce",
    "contact.info.title": "Dane kontaktowe",
    "contact.info.address": "Warszawa i\u00A0okolice",
    "contact.form.intro.title": "Skontaktuj się ze mną",
    "contact.form.intro.description":
      "Wypełnij formularz, a odezwę się do Ciebie jak najszybciej. Możesz również napisać bezpośrednio na adres email.",
    "contact.form.intro.email.label": "Email",
    "contact.form.cta": "Wyślij wiadomość",
    "contact.form.title": "Formularz kontaktowy",
    "contact.form.step": "Krok",
    "contact.form.of": "z",
    "contact.form.back": "Wstecz",
    "contact.form.next": "Dalej",
    "contact.form.submit": "Wyślij formularz",
    "contact.form.step1.title": "Podstawowe informacje",
    "contact.form.step1.description": "Podaj swoje dane kontaktowe",
    "contact.form.name": "Imię i nazwisko",
    "contact.form.email": "Email",
    "contact.form.phone": "Telefon",
    "contact.form.location": "Lokalizacja",
    "contact.form.step2.title": "Twoje potrzeby",
    "contact.form.step2.description": "Opisz, z czym potrzebujesz pomocy",
    "contact.form.problem": "Jaki problem chcesz rozwiązać?",
    "contact.form.problem.option1": "Rzeczy nie mają swojego miejsca",
    "contact.form.problem.option2": "Bałagan wraca po uporządkowaniu",
    "contact.form.problem.option3": "Tylko ja wiem, gdzie co jest",
    "contact.form.problem.option4": "Rzeczy się niszczą lub gubią",
    "contact.form.problem.option5": "Mam duże zapasy, ale nie wiem co",
    "contact.form.problem.option6": "Nie wiem, od czego zacząć",
    "contact.form.problem.option7": "Przestrzeń nie wygląda estetycznie",
    "contact.form.problem.option8": "Inne",
    "contact.form.room": "Które pomieszczenie chcesz zorganizować?",
    "contact.form.room.option1": "Kuchnia",
    "contact.form.room.option2": "Spiżarnia",
    "contact.form.room.option3": "Garderoba",
    "contact.form.room.option4": "Salon",
    "contact.form.room.option5": "Sypialnia",
    "contact.form.room.option6": "Pokój dziecięcy",
    "contact.form.room.option7": "Łazienka",
    "contact.form.room.option8": "Przedpokój",
    "contact.form.room.option9": "Garaż",
    "contact.form.room.option10": "Strych",
    "contact.form.room.option11": "Piwnica/Komórka",
    "contact.form.room.option12": "Inne",
    "contact.form.goal": "Opisz swój cel",
    "contact.form.step3.title": "Dodatkowe informacje",
    "contact.form.step3.description": "Pomóż mi lepiej przygotować si�� do konsultacji",
    "contact.form.preferredDate": "Preferowany termin konsultacji",
    "contact.form.additionalQuestions": "Dodatkowe pytania lub uwagi",
    "contact.form.additionalQuestions.placeholder": "Opisz szczegółowo swoją sytuację...",
    "contact.form.step4.title": "Podsumowanie",
    "contact.form.gdpr": "Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z",
    "contact.form.privacyPolicy": "polityką prywatności",
    "contact.form.success.title": "Dziękuję za wiadomość!",
    "contact.form.success.message": "Odezwę się do Ciebie jak najszybciej, zazwyczaj w ciągu 24 godzin.",
    "contact.form.success.contact": "Dane kontaktowe",
    "contact.form.success.close": "Zamknij",

    // Footer
    "footer.tagline": "Przekształcam chaos w harmonię. Profesjonalna organizacja przestrzeni",
    "footer.quicklinks": "Szybkie linki",
    "footer.contact.title": "Kontakt",
    "footer.contact.phone": "+48 501 733 731",
    "footer.contact.email": "Karolinap.kalinowska@gmail.com",
    "footer.contact.instagram": "@ministerstwo_porzadku",
    "footer.contact.tiktok": "@ministerstwo_porzadku",
    "footer.contact.address": "Warszawa i okolice",
    "footer.manageCookies": "Zarządzaj cookies",
    "footer.rights": "Wszelkie prawa zastrzeżone",

    // Cookie Banner
    "cookies.banner.title": "Ta strona używa cookies",
    "cookies.banner.description":
      "Używamy cookies funkcjonalnych (język, preferencje UI) oraz analytics (Vercel Analytics) aby poprawić Twoje doświadczenia. Możesz zarządzać swoimi preferencjami w każdej chwili.",
    "cookies.banner.acceptAll": "Akceptuję wszystkie",
    "cookies.banner.rejectAll": "Tylko niezbędne",
    "cookies.banner.settings": "Ustawienia",

    // Cookie Settings Modal
    "cookies.settings.title": "Ustawienia cookies",
    "cookies.settings.description":
      "Zarządzaj swoimi preferencjami dotyczącymi cookies. Możesz włączyć lub wyłączyć poszczególne kategorie.",
    "cookies.settings.save": "Zapisz ustawienia",
    "cookies.settings.acceptAll": "Akceptuj wszystkie",
    "cookies.settings.cancel": "Anuluj",

    // Cookie Categories
    "cookies.necessary.title": "Niezbędne cookies",
    "cookies.necessary.description":
      "Te cookies są wymagane do podstawowego działania strony i nie mogą być wyłączone. Obejmują cookies sesji i bezpieczeństwa.",
    "cookies.alwaysActive": "Zawsze aktywne",

    "cookies.functional.title": "Funkcjonalne cookies",
    "cookies.functional.description":
      "Te cookies pozwalają na zapamiętanie Twoich preferencji, takich jak wybór języka czy stan UI. Poprawiają Twoje doświadczenia na stronie.",

    "cookies.analytics.title": "Analytics cookies",
    "cookies.analytics.description":
      "Te cookies pomagają nam zrozumieć, jak odwiedzający korzystają ze strony. Używamy Vercel Analytics, który jest anonimowy i privacy-friendly.",

    // Blog
    "blog.title": "Blog",
    "blog.subtitle": "Praktyczne porady i inspiracje do organizacji przestrzeni",
    "blog.badge": "Inspiracje i porady",
    "blog.tagline": "Nowe inspiracje",
    "blog.description": "Praktyczne porady na co dzień",
    "blog.search.placeholder": "Szukaj artykułów...",
    "blog.categories.all": "Wszystkie",
    "blog.readMore": "Czytaj więcej",
    "blog.readingTime": "min czytania",
    "blog.publishedOn": "Opublikowano",
    "blog.by": "przez",
    "blog.category": "Kategoria",
    "blog.relatedPosts": "Powiązane artykuły",
    "blog.backToBlog": "Wróć do bloga",
    "blog.shareArticle": "Udostępnij artykuł",
    "blog.noPosts": "Brak artykułów",
    "blog.noPostsDescription": "Nie znaleziono artykułów w tej kategorii",
    "blog.tableOfContents": "Spis treści",

    "privacy.title": "Polityka Prywatności",
    "privacy.backToHome": "Powrót do strony głównej",
    "privacy.lastUpdated": "Ostatnia aktualizacja",
    "privacy.intro":
      "Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych przekazanych przez Użytkowników w związku z korzystaniem ze strony internetowej Ministerstwo Porządku.",

    "privacy.administrator.title": "Administrator Danych Osobowych",
    "privacy.administrator.name": "Nazwa",
    "privacy.administrator.address": "Adres",
    "privacy.administrator.phone": "+48 501 733 731",

    "privacy.dataCollection.title": "Jakie Dane Zbieramy",
    "privacy.dataCollection.intro": "Zbieramy następujące kategorie danych osobowych:",
    "privacy.dataCollection.contactForm.title": "Dane z formularza kontaktowego",
    "privacy.dataCollection.contactForm.name": "Imię i nazwisko",
    "privacy.dataCollection.contactForm.email": "Adres e-mail",
    "privacy.dataCollection.contactForm.phone": "Numer telefonu (opcjonalnie)",
    "privacy.dataCollection.contactForm.message": "Treść wiadomości",
    "privacy.dataCollection.cookies.title": "Dane zbierane automatycznie (cookies)",
    "privacy.dataCollection.cookies.functional": "Cookies funkcjonalne",
    "privacy.dataCollection.cookies.functionalDesc": "Przechowują preferencje językowe i ustawienia interfejsu",
    "privacy.dataCollection.cookies.analytics": "Cookies analityczne",
    "privacy.dataCollection.cookies.analyticsDesc":
      "Zbierają anonimowe dane o sposobie korzystania ze strony (Vercel Analytics)",
    "privacy.dataCollection.analytics.title": "Dane analityczne",
    "privacy.dataCollection.analytics.desc":
      "Używamy Vercel Analytics do zbierania anonimowych danych o ruchu na stronie. Nie identyfikujemy indywidualnych użytkowników.",

    "privacy.purpose.title": "Cel Przetwarzania Danych",
    "privacy.purpose.item1": "Odpowiedź na zapytania przesłane przez formularz kontaktowy",
    "privacy.purpose.item2": "Świadczenie usług organizacji przestrzeni",
    "privacy.purpose.item3": "Analiza ruchu na stronie i poprawa jakości usług",
    "privacy.purpose.item5": "Marketing i komunikacja (za zgodą)",

    "privacy.legalBasis.title": "Podstawa Prawna",
    "privacy.legalBasis.item1": "Zgoda (Art. 6 ust. 1 lit. a RODO) - dla cookies analitycznych i marketingu",
    "privacy.legalBasis.item2":
      "Prawnie uzasadniony interes (Art. 6 ust. 1 lit. f RODO) - dla cookies funkcjonalnych i analityki",
    "privacy.legalBasis.item3": "Wykonanie umowy (Art. 6 ust. 1 lit. b RODO) - dla świadczenia usług",

    "privacy.thirdParties.title": "Udostępnianie Danych Osobom Trzecim",
    "privacy.thirdParties.intro": "Korzystamy z następujących usług zewnętrznych, które mogą przetwarzać Twoje dane:",
    "privacy.thirdParties.vercel":
      "Vercel - Hosting strony i anonimowa analityka ruchu. Vercel Analytics nie używa cookies i nie identyfikuje użytkowników.",
    "privacy.thirdParties.resend":
      "Resend - Usługa wysyłki e-maili. Przetwarzamy Twoje dane kontaktowe wyłącznie w celu odpowiedzi na zapytania.",
    "privacy.thirdParties.stripe":
      "Stripe - Obsługa płatności online. Stripe przetwarza dane płatnicze zgodnie z najwyższymi standardami bezpieczeństwa (PCI DSS).",
    "privacy.thirdParties.sanity":
      "Sanity - System zarządzania treścią (CMS). Przechowujemy w nim treści bloga i inne dane publiczne.",

    "privacy.retention.title": "Okres Przechowywania Danych",
    "privacy.retention.item1":
      "Dane z formularza kontaktowego - do 2 lat od ostatniego kontaktu lub do momentu wycofania zgody",
    "privacy.retention.item2": "Cookies funkcjonalne - do 1 roku",
    "privacy.retention.item3": "Cookies analityczne - do 1 roku (jeśli wyraziłeś zgodę)",

    "privacy.rights.title": "Twoje Prawa",
    "privacy.rights.intro": "Zgodnie z RODO przysługują Ci następujące prawa:",
    "privacy.rights.access": "Prawo dostępu",
    "privacy.rights.accessDesc": "Możesz uzyskać informację o przetwarzanych danych",
    "privacy.rights.rectification": "Prawo do sprostowania",
    "privacy.rights.rectificationDesc": "Możesz poprawić nieprawidłowe dane",
    "privacy.rights.erasure": "Prawo do usunięcia",
    "privacy.rights.erasureDesc": 'Możesz żądać usunięcia danych ("prawo do bycia zapomnianym")',
    "privacy.rights.restriction": "Prawo do ograniczenia przetwarzania",
    "privacy.rights.restrictionDesc": "Możesz ograniczyć sposób przetwarzania danych",
    "privacy.rights.portability": "Prawo do przenoszenia danych",
    "privacy.rights.portabilityDesc": "Możesz otrzymać dane w formacie umożliwiającym przeniesienie",
    "privacy.rights.objection": "Prawo do sprzeciwu",
    "privacy.rights.objectionDesc": "Możesz sprzeciwić się przetwarzaniu danych",
    "privacy.rights.complaint": "Prawo do skargi",
    "privacy.rights.complaintDesc": "Możesz złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych",

    "privacy.security.title": "Bezpieczeństwo Danych",
    "privacy.security.intro": "Stosujemy następujące środki bezpieczeństwa:",
    "privacy.security.item1": "Szyfrowanie połączenia SSL/TLS",
    "privacy.security.item2": "Sanityzacja danych wejściowych (ochrona przed XSS)",
    "privacy.security.item3": "Rate limiting (ochrona przed spamem)",
    "privacy.security.item4": "Regularne aktualizacje zabezpieczeń",

    "privacy.changes.title": "Zmiany w Polityce Prywatności",
    "privacy.changes.desc":
      "Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej Polityce Prywatności. O wszelkich zmianach poinformujemy na tej stronie.",

    "privacy.contact.title": "Kontakt",
    "privacy.contact.desc": "W sprawach dotycz\u0105cych ochrony danych osobowych prosimy o kontakt:",

    // FAQ Page
    "faq.page.title": "Cz\u0119sto zadawane pytania",
    "faq.page.subtitle": "Porz\u0105dkujemy Twoje w\u0105tpliwo\u015Bci. Ka\u017Cde pytanie zas\u0142uguje na jasn\u0105 odpowied\u017A \u2014 tak jak ka\u017Cda przestrze\u0144 zas\u0142uguje na harmonii\u0119.",
    "faq.page.badge": "Baza wiedzy",
    "faq.page.cta.title": "Nie znalaz\u0142e\u015B odpowiedzi?",
    "faq.page.cta.description": "Skontaktuj si\u0119 z nami \u2014 ch\u0119tnie odpowiemy na Twoje pytania i pomo\u017Cemy dopasowa\u0107 us\u0142ug\u0119 do Twoich potrzeb.",
    "faq.page.cta.button": "Napisz do nas",
    "faq.page.search": "Szukaj w pytaniach...",
    "faq.page.no.results": "Brak wynik\u00F3w dla tego zapytania",
    "faq.page.all": "Wszystkie",
    "faq.page.empty.title": "Wkr\u00F3tce dodamy odpowiedzi",
    "faq.page.empty.description": "Pracujemy nad sekcj\u0105 FAQ. Wkr\u00F3tce pojawi\u0105 si\u0119 tu odpowiedzi na najcz\u0119\u015Bciej zadawane pytania.",
    "faq.question.cta.text": "Chcesz dowiedzie\u0107 si\u0119 wi\u0119cej? Skontaktuj si\u0119 z nami \u2014 ch\u0119tnie odpowiem na dodatkowe pytania.",
    "faq.question.related": "Powi\u0105zane pytania",
    "faq.question.backToAll": "Wr\u00F3\u0107 do wszystkich pyta\u0144",
    "faq.question.readMore": "Czytaj pe\u0142n\u0105 odpowied\u017A",
  
    "faq.category.general": "Og\u00F3lne",
    "faq.category.process": "Proces",
    "faq.category.pricing": "Cennik",
    "faq.category.services": "Us\u0142ugi",
    "faq.category.practical": "Praktyczne",

    "faq.general.q1": "Czym jest decluttering?",
    "faq.general.a1": "Decluttering to proces \u015Bwiadomego usuwania zb\u0119dnych przedmiot\u00F3w z przestrzeni \u017Cyciowej. To nie tylko sprz\u0105tanie \u2014 to zmiana podej\u015Bcia do tego, co naprawd\u0119 potrzebujesz. Pomagam Ci zdecydowa\u0107, co zachowa\u0107, co odda\u0107, a co mo\u017Cna wyrzuci\u0107, aby Tw\u00F3j dom sta\u0142 si\u0119 bardziej funkcjonalny i harmonijny.",
    "faq.general.q2": "Jak wygl\u0105da wsp\u00F3\u0142praca z Professional Organizerem?",
    "faq.general.a2": "Wsp\u00F3\u0142praca zaczyna si\u0119 od bezp\u0142atnej konsultacji telefonicznej, podczas kt\u00F3rej omawiamy Twoje potrzeby i cele. Nast\u0119pnie tworz\u0119 indywidualny plan dzia\u0142ania i realizuj\u0119 go wsp\u00F3lnie z Tob\u0105, krok po kroku, a\u017C do osi\u0105gni\u0119cia wymarzonej przestrzeni. Ca\u0142y proces jest dopasowany do Twojego tempa i preferencji.",
    "faq.general.q3": "Czy musz\u0119 by\u0107 obecny/a podczas organizacji?",
    "faq.general.a3": "Tak, Twoja obecno\u015B\u0107 jest wa\u017Cna, szczeg\u00F3lnie podczas etapu selekcji (declutteringu). Wsp\u00F3lnie podejmujemy decyzje o tym, co zachowa\u0107. Mog\u0119 jednak pracowa\u0107 samodzielnie przy organizowaniu ju\u017C posegregowanych rzeczy, je\u015Bli wolisz. Wszystko ustalamy indywidualnie.",

    "faq.process.q1": "Jak d\u0142ugo trwa organizacja przestrzeni?",
    "faq.process.a1": "Czas realizacji zale\u017Cy od wielko\u015Bci przestrzeni i zakresu prac. Ma\u0142a szafa mo\u017Ce zaj\u0105\u0107 2-3 godziny, pojedynczy pok\u00F3j to ok. 4-6 godzin, a pe\u0142na organizacja domu to kilka dni pracy. Dok\u0142adny harmonogram ustalimy podczas wst\u0119pnej konsultacji.",
    "faq.process.q2": "Jak si\u0119 przygotowa\u0107 do wizyty organizera?",
    "faq.process.a2": "Nie musisz robi\u0107 nic specjalnego! Najwa\u017Cniejsze to by\u0107 otwartym na zmiany i mie\u0107 gotowo\u015B\u0107 do podejmowania decyzji. Przed wizyt\u0105 wy\u015Bl\u0119 Ci kr\u00F3tki kwestionariusz, kt\u00F3ry pomo\u017Ce mi lepiej zrozumie\u0107 Twoje potrzeby i przygotowa\u0107 si\u0119 do pracy.",
    "faq.process.q3": "Co dzieje si\u0119 z rzeczami, kt\u00F3re zdecyduj\u0119 si\u0119 odda\u0107?",
    "faq.process.a3": "Pomagam posortowa\u0107 rzeczy na kategorie: do oddania (PCK, fundacje, znajomi), do sprzeda\u017Cy (OLX, bazarki) i do utylizacji. Mog\u0119 te\u017C pom\u00F3c z organizacj\u0105 odbioru przez organizacje charytatywne. \u017Badna rzecz nie jest wyrzucana bez Twojej \u015Bwiadomej decyzji.",

    "faq.pricing.q1": "Ile kosztuj\u0105 us\u0142ugi organizacji przestrzeni?",
    "faq.pricing.a1": "Wycena jest indywidualna i zale\u017Cy od zakresu prac, wielko\u015Bci przestrzeni i lokalizacji. Konsultacja online/stacjonarna to 1500 z\u0142. Pozosta\u0142e us\u0142ugi wyceniam po bezp\u0142atnej rozmowie telefonicznej, podczas kt\u00F3rej poznam Twoje potrzeby.",
    "faq.pricing.q2": "Czy musz\u0119 kupowa\u0107 organizery i pojemniki?",
    "faq.pricing.a2": "Nie zawsze! Cz\u0119sto okazuje si\u0119, \u017Ce po declutteringu wystarczy to, co ju\u017C masz. Je\u015Bli potrzebne s\u0105 dodatkowe organizery, dobior\u0119 je specjalnie do Twojej przestrzeni i bud\u017Cetu. Zawsze rekomenduj\u0119 rozwi\u0105zania, kt\u00F3re s\u0105 praktyczne i estetyczne.",
    "faq.pricing.q3": "Czy dojazd jest wliczony w cen\u0119?",
    "faq.pricing.a3": "Dojazd w obr\u0119bie Warszawy jest wliczony w cen\u0119 us\u0142ugi. W przypadku lokalizacji poza Warszaw\u0105 (do 50 km) doliczam symboliczn\u0105 op\u0142at\u0119 za dojazd, kt\u00F3r\u0105 ustalimy indywidualnie.",

    "faq.services.q1": "Czy obs\u0142ugujecie ca\u0142\u0105 Warszaw\u0119?",
    "faq.services.a1": "Tak, obs\u0142uguj\u0119 ca\u0142\u0105 Warszaw\u0119 i okolice do 50 km, w tym dzielnice: Mokot\u00F3w, \u015Ar\u00F3dmie\u015Bcie, Ochota, Wola, \u017Boliborz, Praga i inne. Konsultacje online s\u0105 dost\u0119pne dla klient\u00F3w z ca\u0142ej Polski.",
    "faq.services.q2": "Jaka jest r\u00F3\u017Cnica mi\u0119dzy us\u0142ugami?",
    "faq.services.a2": "Projektowa organizacja to kompleksowy plan od audytu po wdro\u017Cenie systemu. Decluttering to selekcja i porz\u0105dkowanie istniej\u0105cych rzeczy. Wsparcie w przeprowadzce to pomoc od pakowania po organizacj\u0119 nowej przestrzeni. Konsultacja to indywidualna rozmowa i plan, kt\u00F3ry wdra\u017Casz samodzielnie.",
    "faq.services.q3": "Czy oferujecie us\u0142ugi dla firm i biur?",
    "faq.services.a3": "Tak! Organizacja przestrzeni biurowej to r\u00F3wnie wa\u017Cna cz\u0119\u015B\u0107 mojej pracy. Pomagam firmom w optymalizacji przestrzeni, tworzeniu system\u00F3w przechowywania dokument\u00F3w i organizacji stanowisk pracy. Skontaktuj si\u0119, aby om\u00F3wi\u0107 potrzeby Twojej firmy.",

    "faq.practical.q1": "Jak utrzyma\u0107 porz\u0105dek po organizacji?",
    "faq.practical.a1": "Ka\u017Cdy klient otrzymuje ode mnie wskaz\u00F3wki dotycz\u0105ce utrzymania nowego porz\u0105dku. Kluczem jest zasada \u201Ejedno wchodzi, jedno wychodzi\u201D oraz regularne 10-minutowe sesje porz\u0105dkowe. System organizacji, kt\u00F3ry wdra\u017Cam, jest zaprojektowany tak, aby by\u0142 intuicyjny i \u0142atwy w utrzymaniu.",
    "faq.practical.q2": "Czy organizacja przestrzeni dzia\u0142a z dzie\u0107mi?",
    "faq.practical.a2": "Absolutnie! Tworz\u0119 systemy organizacji dostosowane do wieku dzieci \u2014 niskie p\u00F3\u0142ki, oznakowane pojemniki z obrazkami, strefy do zabawy i nauki. Dzieci ch\u0119tnie utrzymuj\u0105 porz\u0105dek, gdy wiedz\u0105, gdzie co nale\u017Cy od\u0142o\u017Cy\u0107.",
    "faq.practical.q3": "Czy pomagasz r\u00F3wnie\u017C z gara\u017Cem, piwnic\u0105, strychem?",
    "faq.practical.a3": "Tak, organizuj\u0119 ka\u017Cd\u0105 przestrze\u0144 \u2014 od garderoby po gara\u017C, piwnic\u0119, strych czy dom\u0119k letniskowy. Cz\u0119sto to w\u0142a\u015Bnie te pomieszczenia s\u0105 najwi\u0119kszym wyzwaniem i przynosz\u0105 najwi\u0119cej satysfakcji po organizacji.",
  },
  en: {
    // Navigation
    "nav.about": "About Me",
    "nav.services": "Services / Pricing",
    "nav.process": "Process",
    "nav.transformations": "Projects",
    "nav.testimonials": "Testimonials",
    "nav.ebooks": "Ebooks", // Added ebooks navigation translation
    "nav.contact": "Contact",
    "nav.faq": "FAQ",
    "nav.cta": "Book Consultation",

    // Breadcrumbs
    "breadcrumbs.home": "Home",
    "breadcrumbs.label": "Breadcrumb navigation",
    "breadcrumbs.services": "Services",
    "breadcrumbs.blog": "Blog",
    "breadcrumbs.category": "Category",
    "breadcrumbs.privacyPolicy": "Privacy Policy",
    "breadcrumbs.faq": "FAQ",

    // 404 Page
    "notFound.code": "404",
    "notFound.title": "Page not found",
    "notFound.subtitle": "Oops! The page you're looking for doesn't exist.",
    "notFound.description": "It may have been moved or deleted. Check the URL or return to the homepage.",
    "notFound.home": "Homepage",
    "notFound.services": "Our services",
    "notFound.contact": "Contact",

    // Hero
    "hero.badge": "Professional space organization",
    "hero.tagline": "Peace starts here.",
    "hero.title": "Peace starts here.",
    "hero.description.brand": "Ministry of Order",
    "hero.description.rest":
      "is more than space organization. It's a way to regain balance — at home, in your mind, in everyday life.",
    "hero.description2": "Because when there's order around you, it's easier to find peace within yourself.",
    "hero.company.description":
      "Ministry of Order is a space created from the need to live in harmony. I help people who lead intensive lives – combining professional, family, and personal responsibilities – regain control over their environment through thoughtful space organization. I offer project-based space organization services, decluttering, online consultations, and comprehensive moving organization – from A to Z. I believe that order is not a goal in itself, but a way to a lighter, calmer, and more conscious life. Ministry of Order is a brand whose mission is to help you create a space that truly supports you.",
    "hero.company.seeMore": "See more",
    "hero.company.seeLess": "See less",
    "hero.cta.primary": "Book Consultation",
    "hero.cta.secondary": "Explore My Services",
    "hero.stats.clients": "Happy Clients",
    "hero.stats.spaces": "Organized Spaces",
    "hero.stats.experience": "Years of Experience",
    "hero.testimonial": "My mission is to help you create a space that truly supports you",
    "hero.testimonial.author": "Karolina Kalinowska",

    // About
    "about.badge": "Get to know me",
    "about.quote": "My mission is to help you create a space that truly supports you",
    "about.quoteName": "Karolina Kalinowska",
    "about.name": "Karolina Kalinowska",
    "about.role": "Founder of Ministry of Order",
    "about.bio1":
      "I am a professional space organizer and decluttering specialist. I help people regain control over their environment and create spaces that support their daily lives.",
    "about.bio2":
      "I believe that order is not just about aesthetics, but primarily about functionality and peace of mind. Every space has the potential to become a place of harmony and efficiency.",
    "about.bio3":
      "My approach combines practical solutions with empathy and understanding of each client's individual needs. I work with private individuals and companies, creating organization systems tailored to their lifestyle and work.",
    "about.credentials": "Qualifications and Experience",
    "about.credential1": "Certificate of completion of the Architecture of Order course with Agnieszka Witkowska",
    "about.credential2": "Over 5 years of experience in space organization",
    "about.credential3": "Over 200 completed projects",
    "about.credential4": "Specialization in decluttering and minimalism",

    // Services
    "services.badge": "Comprehensive Solutions",
    "services.title": "My Services",
    "services.subtitle": "I offer comprehensive solutions tailored to your needs. Every space deserves harmony.",
    "services.cta": "View Details",
    "services.includes": "What's Included",
    "services.starting": "Starting from",
    "services.book": "Book Consultation",
    "services.details": "Service Details",
    "services.forWhom": "Who is it for",

    "services.home.badge": "Most Popular",
    "services.home.title": "Project-Based Space Organization",
    "services.home.description":
      "A functional home starts with a well-thought-out project. Project-based space organization service combines knowledge of ergonomics, functionality, and organization. I help create an interior where everything has its place — at the project stage or right after moving in. This way you avoid clutter, chaos, and misguided solutions.",
    "services.home.details":
      "It's a comprehensive process that combines needs analysis, adapting space to household lifestyle, and practical organizational solutions. I work with people who are just designing their interiors, as well as those who already live in a new home but feel something isn't working. Each project is an individual approach — I base it on daily habits, life rhythm, and real client needs.",
    "services.home.feature1": "Consultation and space analysis",
    "services.home.feature2": "Moodboard and organization concept",
    "services.home.feature3": "Space organization project",
    "services.home.feature4": "Shopping list and implementation",
    "services.home.price": "Individual pricing",

    "services.office.badge": "Comprehensive",
    "services.office.title": "Decluttering and Space Organization",
    "services.office.description":
      "New order, new energy, new space. This is a comprehensive service that combines decluttering – the process of getting rid of excess items with mindfulness and support – and space organization, which means adapting the most functional organizational solutions individually to you, your needs, your belongings, and your space. I help organize your home or office so that everyday life becomes simpler, calmer, and more functional.",
    "services.office.details":
      "During our collaboration, I combine practical solutions with an empathetic approach to the process of change. Decluttering is not just about organizing things — it's also working with emotions, decisions, and habits. Space organization is the next step: creating a thoughtful system that makes it easier to maintain order on a daily basis. We work at your pace, with full physical, emotional, and advisory support.",
    "services.office.forWhom":
      "For people who feel that clutter takes away their peace and energy. For those who want to start fresh – consciously and functionally. For homeowners, apartment dwellers, and office owners who need better space organization. For people who need support in the organizing process – both practical and emotional.",
    "services.office.feature1": "Consultation and space diagnosis",
    "services.office.feature2": "Action plan and preparation",
    "services.office.feature3": "Decluttering process",
    "services.office.feature4": "Space organization process",
    "services.office.price": "Individual pricing",

    "services.moving.badge": "Full Support",
    "services.moving.title": "Moving Support",
    "services.moving.description":
      "Your new beginning in a perfectly organized space. This is a comprehensive service that combines decluttering, packing, moving coordination, and complete space organization in your new home. You take care of your life – I make sure your new home is ready to move in, perfected in every detail.",
    "services.moving.details":
      "We start with decluttering — selecting and organizing items that will stay in your new home, so the space is light and functional. Then I handle packing in a logical and systematic way, so unpacking in the new home is quick and stress-free. Throughout the entire move, I provide coordination, and in the new home I create a functional organization system tailored to your lifestyle and daily rhythm.",
    "services.moving.forWhom":
      "For people who want to move efficiently and stress-free. For those who don't want to handle logistics, packing, and unpacking themselves. For families or busy people who need support throughout the entire moving process. For anyone who wants their new home to be organized and functional from day one.",
    "services.moving.feature1": "Decluttering and preparing space for moving",
    "services.moving.feature2": "Moving plan and coordination",
    "services.moving.feature3": "Packing and labeling items",
    "services.moving.feature4": "Unpacking and organizing in the new home",
    "services.moving.price": "Individual pricing",

    "services.online.badge": "Flexible",
    "services.online.title": "Online / In-Person Consultation",
    "services.online.description":
      "Planned space that you can implement yourself. The service allows you to develop a functional space organization plan, tailored to your needs and lifestyle, which you can implement yourself in your home or office.",
    "services.online.details":
      "During the consultation, we analyze your space and users' daily needs. I create proposals for functional solutions that will improve ergonomics and comfort of using the space. The result is an action plan that you can implement yourself, step by step, with practical guidelines for organization, storage, and interior layout optimization.",
    "services.online.forWhom":
      "For people who want to make changes to their interior themselves but need professional support in planning. For those who want to optimally use space and improve functionality of rooms. For homeowners, apartment dwellers, or office owners looking for practical, tailored solutions without comprehensive service implementation.",
    "services.online.feature1": "Online or in-person consultation",
    "services.online.feature2": "Analysis of interior layout and users' daily habits",
    "services.online.feature3": "Proposals for functional solutions and space optimization",
    "services.online.feature4": "Action plan for self-implementation",
    "services.online.price": "$130",

    // Ebooks
    "ebooks.badge": "Ebook Store",
    "ebooks.title": "Ebooks",
    "ebooks.subtitle": "Practical guides to help you organize your space. Download instantly after purchase.",
    "ebooks.pages": "pages",
    "ebooks.format": "Format",
    "ebooks.viewDetails": "View details",
    "ebooks.samplePages": "Sample pages",
    "ebooks.instant": "Instant",
    "ebooks.download": "Download",
    "ebooks.whatYouGet": "What you'll get",
    "ebooks.buyNow": "Coming soon",
    "ebooks.securePayment": "Secure payment via Stripe",
    "ebooks.backToDetails": "Back to details",

    // Testimonials
    "testimonials.title": "Client Reviews",
    "testimonials.subtitle": "See what clients say about me. Every review is a transformation story.",

    "testimonials.client1.name": "Anna Kowalska",
    "testimonials.client1.location": "Warsaw, Mokotów",
    "testimonials.client1.text":
      "Ministry of Order completely changed my approach to home organization. After their visit, my wardrobe looks like from a magazine, and most importantly - maintaining order is now simple and pleasant. I highly recommend!",

    "testimonials.client2.name": "Piotr Nowak",
    "testimonials.client2.location": "Krakow, Old Town",
    "testimonials.client2.text":
      "As a small business owner, I needed help organizing my office. The result exceeded my wildest expectations - productivity increased, and the stress of searching for documents disappeared. Professionalism at the highest level.",

    "testimonials.client3.name": "Magdalena Wiśniewska",
    "testimonials.client3.location": "Gdańsk, Oliwa",
    "testimonials.client3.text":
      "Moving with the help of Ministry of Order was the best decision. Instead of chaos and stress, I received professional support at every stage. In the new apartment, everything was in its place from day one. Invaluable help!",

    "testimonials.client4.name": "Tomasz Lewandowski",
    "testimonials.client4.location": "Wrocław, Krzyki",
    "testimonials.client4.text":
      "The online consultation turned out to be a bullseye. Even though I live far from Warsaw, I received full support and a detailed plan for organizing my home office. Everything clear, specific and easy to implement. Highly recommend!",

    "testimonials.client5.name": "Karolina Zielińska",
    "testimonials.client5.location": "Poznań, Grunwald",
    "testimonials.client5.text":
      "Online consultations are a great solution for busy people. I received a detailed plan for organizing my kitchen and bathroom, which I could implement at my own pace. Email support was invaluable. My space now breathes!",

    "testimonials.client6.name": "Michał Dąbrowski",
    "testimonials.client6.location": "Łódź, Bałuty",
    "testimonials.client6.text":
      "Organizing the office in our company was a challenge. Ministry of Order created a system that works perfectly for the entire team. Documents are easily accessible, the space is functional, and the work atmosphere has significantly improved.",

    // Process
    "process.title": "How I Work",
    "process.subtitle": "My proven process guarantees success. Every step is thoughtful and tailored to your needs.",
    "process.seeHowIWork": "See how I work",
    "process.step1.title": "Consultation",
    "process.step1.description":
      "I learn about your needs, analyze the space and set goals. Free initial consultation.",
    "process.step2.title": "Action Plan",
    "process.step2.description": "I create a detailed organization plan tailored to your lifestyle and budget.",
    "process.step3.title": "Implementation",
    "process.step3.description": "Together we organize the space, I teach systems and help with item selection.",
    "process.step4.title": "Support",
    "process.step4.description": "I stay in touch to make sure new habits stick.",

    // Transformation
    "transformation.title": "Projects",
    "transformation.subtitle": "See how I transform spaces. Every project is a unique story of change.",
    "transformation.badge": "My Projects",
    "transformation.photoAlt": "Organized space",
    "transformation.previous": "Previous project",
    "transformation.next": "Next project",
    "transformation.goTo": "Go to project",
    "transformation.wardrobe.title": "Wardrobe",
    "transformation.wardrobe.location": "Warsaw October 2025",
    "transformation.wardrobe.description": "Functional wardrobe organization",
    "transformation.wardrobe.details":
      "Comprehensive wardrobe organization with a thoughtful storage system. Organized clothes on hangers, folded sweaters on shelves, and organized bags and accessories. Everything has its place, making daily morning preparations and maintaining order easier.",
    "transformation.kitchen1.title": "Kitchen",
    "transformation.kitchen1.location": "Łuków September 2025",
    "transformation.kitchen1.description": "From chaos to functional space",
    "transformation.kitchen1.details":
      "In this kitchen, I ensured easy access to dry products, especially breakfast items, so that the youngest family members can independently prepare their morning meal. The thoughtful layout of cabinets and drawers ensures everything has its place, and order is maintained naturally.",
    "transformation.kitchen2.title": "Kitchen",
    "transformation.kitchen2.location": "Warsaw February 2025",
    "transformation.kitchen2.description": "New space begins with harmony",
    "transformation.kitchen2.details":
      "In this project, the priority was well-planned drawers for spices and dry goods – thanks to them, order became natural, and everything is exactly where it should be. The client gained a new, harmonious space where aesthetics go hand in hand with functionality.",
    "transformation.office.title": "Home Office",
    "transformation.office.description": "From mess to productive space",
    "transformation.office.details":
      "I transformed a cluttered home office into a functional workspace. Document archiving system, organized desk and thoughtful storage solutions for office materials increased productivity by 40%. The client can now focus on work instead of searching for needed items.",
    "transformation.ebooks.title": "Ebooks",
    "transformation.ebooks.description": "Practical guides to help you organize your space",
    "transformation.ebooks.details":
      "Ebooks contain practical guides that will help you organize your space. You can download them instantly after purchase.",
    "transformation.contact.title": "Contact",
    "transformation.contact.description": "Contact me to book a consultation",
    "transformation.contact.details":
      "You can contact me through the contact form or email. I'll get back to you as soon as possible.",
    "transformation.about.title": "About Me",
    "transformation.about.description": "Space organization and minimalism enthusiast",
    "transformation.about.details":
      "I create spaces that harmonize everyday life, support concentration, improve well-being, and allow you to fully enjoy life.",
    "transformation.process.title": "How I Work",
    "transformation.process.description": "My proven process guarantees success",
    "transformation.process.details":
      "Every step is thoughtful and tailored to your needs. I learn about your needs, analyze the space and set goals.",
    "transformation.stats.title": "Statistics",
    "transformation.stats.description": "My achievements in space organization",
    "transformation.stats.details":
      "Happy clients, organized spaces, years of experience. I believe that order is a way to a lighter, calmer, and more conscious life.",

    // Contact
    "contact.title": "Get in Touch",
    "contact.subtitle": "Book a free consultation and start your space transformation",
    "contact.phone": "Phone",
    "contact.location": "Location",
    "contact.online": "Online consultations available throughout Poland",
    "contact.info.title": "Contact Information",
    "contact.info.address": "Warsaw and surroundings",
    "contact.form.intro.title": "Get in Touch",
    "contact.form.intro.description":
      "Fill out the form and I'll get back to you as soon as possible. You can also email me directly.",
    "contact.form.intro.email.label": "Email",
    "contact.form.cta": "Send Message",
    "contact.form.title": "Contact Form",
    "contact.form.step": "Step",
    "contact.form.of": "of",
    "contact.form.back": "Back",
    "contact.form.next": "Next",
    "contact.form.submit": "Submit Form",
    "contact.form.step1.title": "Basic Information",
    "contact.form.step1.description": "Provide your contact details",
    "contact.form.name": "Full Name",
    "contact.form.email": "Email",
    "contact.form.phone": "Phone",
    "contact.form.location": "Location",
    "contact.form.step2.title": "Your Needs",
    "contact.form.step2.description": "Describe what you need help with",
    "contact.form.problem": "What problem do you want to solve?",
    "contact.form.problem.option1": "Things don't have their place",
    "contact.form.problem.option2": "Mess returns after organizing",
    "contact.form.problem.option3": "Only I know where things are",
    "contact.form.problem.option4": "Things get damaged or lost",
    "contact.form.problem.option5": "I have large stocks but don't know what",
    "contact.form.problem.option6": "I don't know where to start",
    "contact.form.problem.option7": "Space doesn't look aesthetic",
    "contact.form.problem.option8": "Other",
    "contact.form.room": "Which room do you want to organize?",
    "contact.form.room.option1": "Kitchen",
    "contact.form.room.option2": "Pantry",
    "contact.form.room.option3": "Wardrobe",
    "contact.form.room.option4": "Living Room",
    "contact.form.room.option5": "Bedroom",
    "contact.form.room.option6": "Kids Room",
    "contact.form.room.option7": "Bathroom",
    "contact.form.room.option8": "Hallway",
    "contact.form.room.option9": "Garage",
    "contact.form.room.option10": "Attic",
    "contact.form.room.option11": "Storage",
    "contact.form.room.option12": "Other",
    "contact.form.goal": "Describe your goal",
    "contact.form.step3.title": "Additional Information",
    "contact.form.step3.description": "Help me better prepare for the consultation",
    "contact.form.preferredDate": "Preferred consultation date",
    "contact.form.additionalQuestions": "Additional questions or comments",
    "contact.form.additionalQuestions.placeholder": "Describe your situation in detail...",
    "contact.form.step4.title": "Summary",
    "contact.form.gdpr": "I consent to the processing of my personal data in accordance with the",
    "contact.form.privacyPolicy": "privacy policy",
    "contact.form.success.title": "Thank you for your message!",
    "contact.form.success.message": "I'll get back to you as soon as possible, usually within 24 hours.",
    "contact.form.success.contact": "Contact Information",
    "contact.form.success.close": "Close",

    // Footer
    "footer.tagline": "Transforming chaos into harmony. Professional space organization",
    "footer.quicklinks": "Quick Links",
    "footer.contact.title": "Contact",
    "footer.contact.phone": "+48 501 733 731",
    "footer.contact.email": "Karolinap.kalinowska@gmail.com",
    "footer.contact.instagram": "@ministerstwo_porzadku",
    "footer.contact.tiktok": "@ministerstwo_porzadku",
    "footer.contact.address": "Warsaw and surroundings",
    "footer.manageCookies": "Manage cookies",
    "footer.rights": "All rights reserved",

    // Cookie Banner
    "cookies.banner.title": "This site uses cookies",
    "cookies.banner.description":
      "We use functional cookies (language, UI preferences) and analytics (Vercel Analytics) to improve your experience. You can manage your preferences at any time.",
    "cookies.banner.acceptAll": "Accept all",
    "cookies.banner.rejectAll": "Essential only",
    "cookies.banner.settings": "Settings",

    // Cookie Settings Modal
    "cookies.settings.title": "Cookie settings",
    "cookies.settings.description": "Manage your cookie preferences. You can enable or disable individual categories.",
    "cookies.settings.save": "Save settings",
    "cookies.settings.acceptAll": "Accept all",
    "cookies.settings.cancel": "Cancel",

    // Cookie Categories
    "cookies.necessary.title": "Necessary cookies",
    "cookies.necessary.description":
      "These cookies are required for the basic functionality of the site and cannot be disabled. They include session and security cookies.",
    "cookies.alwaysActive": "Always active",

    "cookies.functional.title": "Functional cookies",
    "cookies.functional.description":
      "These cookies allow us to remember your preferences, such as language selection or UI state. They improve your experience on the site.",

    "cookies.analytics.title": "Analytics cookies",
    "cookies.analytics.description":
      "These cookies help us understand how visitors use the site. We use Vercel Analytics, which is anonymous and privacy-friendly.",

    // Blog
    "blog.title": "Blog",
    "blog.subtitle": "Practical tips and inspiration for space organization",
    "blog.badge": "Inspiration and tips",
    "blog.tagline": "New inspiration",
    "blog.description": "Practical everyday tips",
    "blog.search.placeholder": "Search articles...",
    "blog.categories.all": "All",
    "blog.readMore": "Read more",
    "blog.readingTime": "min read",
    "blog.publishedOn": "Published on",
    "blog.by": "by",
    "blog.category": "Category",
    "blog.relatedPosts": "Related articles",
    "blog.backToBlog": "Back to blog",
    "blog.shareArticle": "Share article",
    "blog.noPosts": "No posts",
    "blog.noPostsDescription": "No articles found in this category",
    "blog.tableOfContents": "Table of contents",

    "privacy.title": "Privacy Policy",
    "privacy.backToHome": "Back to homepage",
    "privacy.lastUpdated": "Last updated",
    "privacy.intro":
      "This Privacy Policy sets out the rules for processing and protecting personal data provided by Users in connection with the use of the Ministerstwo Porządku website.",

    "privacy.administrator.title": "Data Controller",
    "privacy.administrator.name": "Name",
    "privacy.administrator.address": "Address",
    "privacy.administrator.phone": "+48 501 733 731",

    "privacy.dataCollection.title": "What Data We Collect",
    "privacy.dataCollection.intro": "We collect the following categories of personal data:",
    "privacy.dataCollection.contactForm.title": "Contact form data",
    "privacy.dataCollection.contactForm.name": "Name and surname",
    "privacy.dataCollection.contactForm.email": "Email address",
    "privacy.dataCollection.contactForm.phone": "Phone number (optional)",
    "privacy.dataCollection.contactForm.message": "Message content",
    "privacy.dataCollection.cookies.title": "Automatically collected data (cookies)",
    "privacy.dataCollection.cookies.functional": "Functional cookies",
    "privacy.dataCollection.cookies.functionalDesc": "Store language preferences and interface settings",
    "privacy.dataCollection.cookies.analytics": "Analytics cookies",
    "privacy.dataCollection.cookies.analyticsDesc":
      "Collect anonymous data about how the site is used (Vercel Analytics)",
    "privacy.dataCollection.analytics.title": "Analytics data",
    "privacy.dataCollection.analytics.desc":
      "We use Vercel Analytics to collect anonymous data about site traffic. We do not identify individual users.",

    "privacy.purpose.title": "Purpose of Data Processing",
    "privacy.purpose.item1": "Responding to inquiries submitted through the contact form",
    "privacy.purpose.item2": "Providing space organization services",
    "privacy.purpose.item3": "Analyzing site traffic and improving service quality",
    "privacy.purpose.item5": "Marketing and communication (with consent)",

    "privacy.legalBasis.title": "Legal Basis",
    "privacy.legalBasis.item1": "Consent (Art. 6(1)(a) GDPR) - for analytics cookies and marketing",
    "privacy.legalBasis.item2": "Legitimate interest (Art. 6(1)(f) GDPR) - for functional cookies and analytics",
    "privacy.legalBasis.item3": "Contract performance (Art. 6(1)(b) GDPR) - for service provision",

    "privacy.thirdParties.title": "Sharing Data with Third Parties",
    "privacy.thirdParties.intro": "We use the following external services that may process your data:",
    "privacy.thirdParties.vercel":
      "Vercel - Website hosting and anonymous traffic analytics. Vercel Analytics does not use cookies and does not identify users.",
    "privacy.thirdParties.resend":
      "Resend - Email delivery service. We process your contact data solely to respond to inquiries.",
    "privacy.thirdParties.stripe":
      "Stripe - Online payment processing. Stripe processes payment data in accordance with the highest security standards (PCI DSS).",
    "privacy.thirdParties.sanity":
      "Sanity - Content Management System (CMS). We store blog content and other public data in it.",

    "privacy.retention.title": "Data Retention Period",
    "privacy.retention.item1": "Contact form data - up to 2 years from last contact or until consent is withdrawn",
    "privacy.retention.item2": "Functional cookies - up to 1 year",
    "privacy.retention.item3": "Analytics cookies - up to 1 year (if you have given consent)",

    "privacy.rights.title": "Your Rights",
    "privacy.rights.intro": "Under GDPR, you have the following rights:",
    "privacy.rights.access": "Right of access",
    "privacy.rights.accessDesc": "You can obtain information about processed data",
    "privacy.rights.rectification": "Right to rectification",
    "privacy.rights.rectificationDesc": "You can correct incorrect data",
    "privacy.rights.erasure": "Right to erasure",
    "privacy.rights.erasureDesc": 'You can request data deletion ("right to be forgotten")',
    "privacy.rights.restriction": "Right to restriction of processing",
    "privacy.rights.restrictionDesc": "You can restrict how data is processed",
    "privacy.rights.portability": "Right to data portability",
    "privacy.rights.portabilityDesc": "You can receive data in a format that allows transfer",
    "privacy.rights.objection": "Right to object",
    "privacy.rights.objectionDesc": "You can object to data processing",
    "privacy.rights.complaint": "Right to lodge a complaint",
    "privacy.rights.complaintDesc": "You can file a complaint with the supervisory authority",

    "privacy.security.title": "Data Security",
    "privacy.security.intro": "We apply the following security measures:",
    "privacy.security.item1": "SSL/TLS connection encryption",
    "privacy.security.item2": "Input data sanitization (XSS protection)",
    "privacy.security.item3": "Rate limiting (spam protection)",
    "privacy.security.item4": "Regular security updates",

    "privacy.changes.title": "Changes to Privacy Policy",
    "privacy.changes.desc":
      "We reserve the right to make changes to this Privacy Policy. We will inform about any changes on this page.",

    "privacy.contact.title": "Contact",
    "privacy.contact.desc": "For matters related to personal data protection, please contact:",

    // FAQ Page
    "faq.page.title": "Frequently Asked Questions",
    "faq.page.subtitle": "We organize your doubts. Every question deserves a clear answer \u2014 just like every space deserves harmony.",
    "faq.page.badge": "Knowledge Base",
    "faq.page.cta.title": "Didn't find your answer?",
    "faq.page.cta.description": "Get in touch with us \u2014 we'll be happy to answer your questions and help match the right service to your needs.",
    "faq.page.cta.button": "Contact us",
    "faq.page.search": "Search questions...",
    "faq.page.no.results": "No results for this query",
    "faq.page.all": "All",
    "faq.page.empty.title": "Answers coming soon",
    "faq.page.empty.description": "We're working on the FAQ section. Answers to the most frequently asked questions will appear here soon.",
    "faq.question.cta.text": "Want to learn more? Get in touch \u2014 I'll be happy to answer any additional questions.",
    "faq.question.related": "Related questions",
    "faq.question.backToAll": "Back to all questions",
    "faq.question.readMore": "Read full answer",
  
    "faq.category.general": "General",
    "faq.category.process": "Process",
    "faq.category.pricing": "Pricing",
    "faq.category.services": "Services",
    "faq.category.practical": "Practical",

    "faq.general.q1": "What is decluttering?",
    "faq.general.a1": "Decluttering is the process of consciously removing unnecessary items from your living space. It's not just cleaning \u2014 it's changing your approach to what you truly need. I help you decide what to keep, what to donate, and what can be discarded to make your home more functional and harmonious.",
    "faq.general.q2": "What does working with a Professional Organizer look like?",
    "faq.general.a2": "The collaboration starts with a free phone consultation where we discuss your needs and goals. Then I create an individual action plan and work together with you, step by step, until we achieve your dream space. The entire process is tailored to your pace and preferences.",
    "faq.general.q3": "Do I need to be present during the organization?",
    "faq.general.a3": "Yes, your presence is important, especially during the sorting (decluttering) phase. We make decisions together about what to keep. However, I can work independently when organizing already sorted items, if you prefer. Everything is arranged individually.",

    "faq.process.q1": "How long does space organization take?",
    "faq.process.a1": "The timeline depends on the size of the space and scope of work. A small closet may take 2-3 hours, a single room about 4-6 hours, and full home organization takes several days. We'll set an exact schedule during the initial consultation.",
    "faq.process.q2": "How should I prepare for the organizer's visit?",
    "faq.process.a2": "You don't need to do anything special! The most important thing is to be open to changes and ready to make decisions. Before the visit, I'll send you a short questionnaire to help me better understand your needs and prepare for the work.",
    "faq.process.q3": "What happens to items I decide to give away?",
    "faq.process.a3": "I help sort items into categories: for donation (charities, friends), for sale (online marketplaces), and for disposal. I can also help organize pickup by charitable organizations. Nothing is discarded without your conscious decision.",

    "faq.pricing.q1": "How much do space organization services cost?",
    "faq.pricing.a1": "Pricing is individual and depends on the scope of work, space size, and location. Online/in-person consultation is 1500 PLN. Other services are quoted after a free phone call during which I learn about your needs.",
    "faq.pricing.q2": "Do I need to buy organizers and containers?",
    "faq.pricing.a2": "Not always! Often after decluttering, what you already have is sufficient. If additional organizers are needed, I'll select them specifically for your space and budget. I always recommend solutions that are both practical and aesthetic.",
    "faq.pricing.q3": "Is travel included in the price?",
    "faq.pricing.a3": "Travel within Warsaw is included in the service price. For locations outside Warsaw (up to 50 km), I add a symbolic travel fee, which we'll agree on individually.",

    "faq.services.q1": "Do you serve all of Warsaw?",
    "faq.services.a1": "Yes, I serve all of Warsaw and surrounding areas up to 50 km, including districts: Mokot\u00F3w, \u015Ar\u00F3dmie\u015Bcie, Ochota, Wola, \u017Boliborz, Praga, and more. Online consultations are available for clients throughout Poland.",
    "faq.services.q2": "What's the difference between services?",
    "faq.services.a2": "Project organization is a comprehensive plan from audit to system implementation. Decluttering is sorting and organizing existing items. Moving support is help from packing to organizing new spaces. Consultation is an individual conversation and plan that you implement on your own.",
    "faq.services.q3": "Do you offer services for businesses and offices?",
    "faq.services.a3": "Yes! Office space organization is an equally important part of my work. I help companies optimize space, create document storage systems, and organize workstations. Get in touch to discuss your company's needs.",

    "faq.practical.q1": "How to maintain order after organization?",
    "faq.practical.a1": "Every client receives tips on maintaining the new order. The key is the 'one in, one out' rule and regular 10-minute tidying sessions. The organization system I implement is designed to be intuitive and easy to maintain.",
    "faq.practical.q2": "Does space organization work with children?",
    "faq.practical.a2": "Absolutely! I create organization systems adapted to children's ages \u2014 low shelves, labeled containers with pictures, play and study zones. Children are happy to maintain order when they know where everything belongs.",
    "faq.practical.q3": "Do you also help with garages, basements, attics?",
    "faq.practical.a3": "Yes, I organize every space \u2014 from wardrobes to garages, basements, attics, and summer houses. Often these rooms are the biggest challenge and bring the most satisfaction after organization.",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pl")

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language
    if (saved && (saved === "pl" || saved === "en")) {
      setLanguageState(saved)
      document.documentElement.lang = saved
    } else {
      const browserLang = navigator.language || navigator.languages?.[0] || "pl"
      const detected: Language = browserLang.startsWith("pl") ? "pl" : "en"
      setLanguageState(detected)
      document.documentElement.lang = detected
      document.cookie = `language=${detected}; path=/; max-age=31536000; SameSite=Lax`
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
    document.cookie = `language=${lang}; path=/; max-age=31536000; SameSite=Lax`
    document.documentElement.lang = lang
    window.location.reload()
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.pl] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
