let currentQuestionIndex = 0;
let score = 0;
let currentQuiz = [];

const quizData = {
    scripting: [ {
            question: "Eine Scriptsprache wird in ausführbaren Code übersetzt vom...",
            options: ["Compiler", "Interpreter", "Mikroprozessor"],
            answer: ["Interpreter"],
            points: 1
        },
        {
            question: "Javascript ist eine Programmiersprache der",
            options: ["1. Generation", "2. Generation", "3. Generation", "4. Generation", "5. Generation"],
            answer: ["3. Generation"],
            points: 1
        },
        {
            question: "Welche Spracheigenschaften bezüglich Javascript sind korrekt?",
            options: [
                "Groß- und Kleinschreibung spielt keine Rolle",
                "Ein Befehl wird mit einem Semikolon abgeschlossen",
                "Bei Variablen-Deklaration können keine Basis-Datentypen vorgegeben werden",
                "Mit Javascript können dynamische Webseiten programmiert werden",
                "Javascript wird auf dem Web-Server übersetzt und ausgeführt",
                "Javascript ist eine Compiler-Sprache"
            ],
            answer: [
                "Ein Befehl wird mit einem Semikolon abgeschlossen",
                "Bei Variablen-Deklaration können keine Basis-Datentypen vorgegeben werden",
                "Mit Javascript können dynamische Webseiten programmiert werden"
            ],
            points: 3
        },
        {
            question: "4a) Welchen Datentyp hat: var Name = 'Bill Gates';",
            options: ["String", "Number", "Boolean", "Array"],
            answer: ["String"],
            points: 1
        },
        {
            question: "4b) Welchen Datentyp hat: var a = 7/3;",
            options: ["String", "Number", "Boolean", "Array"],
            answer: ["Number"],
            points: 1
        },
        {
            question: "4c) Welchen Datentyp hat: var Antwort = a < b;",
            options: ["String", "Number", "Boolean", "Array"],
            answer: ["Boolean"],
            points: 1
        },
        {
            question: "4d) Welchen Datentyp hat: var Farben=['rot','gelb','grün'];",
            options: ["String", "Number", "Boolean", "Array"],
            answer: ["Array"],
            points: 1
        },
        {
            question: "Was gibt die Schleife aus: for(i=1;i<=10;i++) { if ((i<5) && (i>2)) console.log(i+2); }",
            options: ["3,4", "4,5", "5,6", "Keine Ausgabe"],
            answer: ["4,5"],
            points: 1
        },
        {
            question: "Was ist keine Verzweigung?",
            options: ["while", "for", "if"],
            answer: ["while", "for"],
            points: 2
        },
        {
            question: "Mit welcher HTML-Anweisung kann ich Javascript-Code in HTML einbetten?",
            options: ["&lt;title&gt;", "&lt;function&gt;", "&lt;script&gt;", "&lt;head&gt;"],
            answer: ["&lt;script&gt;"],
            points: 1
        } ],
    system: [ {
            question: "Welche Hauptaufgabe hat ein Application Server?",
            options: [
                "Er stellt Speicherplatz für physische Server bereit.",
                "Er optimiert Schutz von Code und Daten durch serverseitige Logik.",
                "Er ermöglicht die horizontale Skalierung von Netzwerken.",
                "Er dient ausschließlich der Benutzerverwaltung."
            ],
            answer: ["Er optimiert Schutz von Code und Daten durch serverseitige Logik."],
            points: 1
        },
        {
            question: "Was ist das Hauptziel des Client-Managements?",
            options: [
                "Die Reduzierung der Netzwerklatenz.",
                "Die Optimierung der menschlichen Schnittstelle.",
                "Die zentrale Verwaltung und Optimierung der Client-Infrastruktur.",
                "Die Einführung neuer Netzwerkprotokolle."
            ],
            answer: ["Die zentrale Verwaltung und Optimierung der Client-Infrastruktur."],
            points: 1
        },
        {
            question: "Was beschreibt die Client-Server-Architektur am besten?",
            options: [
                "Sie ermöglicht die Skalierung von Hardware.",
                "Sie stellt sicher, dass Clients unabhängig vom Server arbeiten.",
                "Sie teilt Aufgaben zwischen Clients und Servern in einem Netzwerk auf.",
                "Sie ist ein Lizenzmodell für Softwareprodukte."
            ],
            answer: ["Sie teilt Aufgaben zwischen Clients und Servern in einem Netzwerk auf."],
            points: 1
        },
        {
            question: "Was bedeutet 'Infrastructure as a Service' (IaaS)?",
            options: [
                "Die Bereitstellung von Softwareentwicklungsumgebungen.",
                "Die Nutzung physischer Server vor Ort.",
                "Die bedarfsgerechte Bereitstellung von Ressourcen wie Speicher und Netzwerk.",
                "Die Implementierung von Cloud-Anwendungen auf Basis von PaaS."
            ],
            answer: ["Die bedarfsgerechte Bereitstellung von Ressourcen wie Speicher und Netzwerk."],
            points: 1
        },
        {
            question: "Was ist das Ziel des Konfigurationsmanagements?",
            options: [
                "Softwarelizenzen zu verwalten.",
                "IT-Systeme in einem definierten Zustand zu halten.",
                "Netzwerkgeräte ohne Benutzerinteraktion zu betreiben.",
                "Systeme ausschließlich vor Angriffen zu schützen."
            ],
            answer: ["IT-Systeme in einem definierten Zustand zu halten."],
            points: 1
        },
        {
            question: "Wofür dient ein Lastenheft in einem Projekt?",
            options: [
                "Zur Definition von Softwarelizenzen.",
                "Als Antwort auf das Pflichtenheft.",
                "Zur Spezifikation der Anforderungen des Kunden.",
                "Zur Festlegung der Serverarchitektur."
            ],
            answer: ["Zur Spezifikation der Anforderungen des Kunden."],
            points: 1
        },
        {
            question: "Wie unterscheidet sich MTBF von MTTF?",
            options: [
                "MTBF misst die Zeit bis zum ersten Ausfall, MTTF die Reparaturzeit.",
                "MTBF misst die durchschnittliche Zeit zwischen Ausfällen, MTTF die Zeit bis zum ersten Ausfall.",
                "MTBF beschreibt die Stabilität des Systems, MTTF den Energieverbrauch.",
                "MTBF ist ein Maß für Effizienz, MTTF für Benutzerfreundlichkeit."
            ],
            answer: ["MTBF misst die durchschnittliche Zeit zwischen Ausfällen, MTTF die Zeit bis zum ersten Ausfall."],
            points: 1
        },
        {
            question: "Was ist charakteristisch für Open-Source-Software?",
            options: [
                "Sie ist immer kostenlos.",
                "Der Quellcode ist öffentlich einsehbar und veränderbar.",
                "Sie wird ausschließlich von kommerziellen Unternehmen entwickelt.",
                "Sie ist nur für den privaten Gebrauch zugelassen."
            ],
            answer: ["Der Quellcode ist öffentlich einsehbar und veränderbar."],
            points: 1
        },
        {
            question: "Was beschreibt Platform as a Service (PaaS)?",
            options: [
                "Eine Plattform, die nur Infrastruktur bereitstellt.",
                "Eine Cloud-Plattform zur Bereitstellung und Entwicklung von Anwendungen.",
                "Ein Service zur Optimierung von Netzwerksicherheit.",
                "Eine zentrale Verwaltung von Client-Infrastrukturen."
            ],
            answer: ["Eine Cloud-Plattform zur Bereitstellung und Entwicklung von Anwendungen."],
            points: 1
        },
        {
            question: "Wofür steht die Abkürzung QoS (Quality of Service)?",
            options: [
                "Für die Verwaltung von Dienstleistungsverträgen.",
                "Für die Qualität und Zuverlässigkeit eines Dienstes gemäß Nutzeranforderungen.",
                "Für die technische Skalierung von Servern in der Cloud.",
                "Für die Verwaltung von Softwarelizenzen in einem Netzwerk."
            ],
            answer: ["Für die Qualität und Zuverlässigkeit eines Dienstes gemäß Nutzeranforderungen."],
            points: 1
        },
        {
            question: "Was ist der Hauptvorteil von Software as a Service (SaaS)?",
            options: [
                "Die direkte Verbindung zwischen Client und Hardware.",
                "Die Auslagerung der Wartung und Aktualisierung an den Anbieter.",
                "Die physische Lagerung der Daten beim Nutzer.",
                "Die vollständige Kontrolle über den Quellcode durch den Nutzer."
            ],
            answer: ["Die Auslagerung der Wartung und Aktualisierung an den Anbieter."],
            points: 1
        },
        {
            question: "Was ist eine virtuelle Maschine (VM)?",
            options: [
                "Ein physischer Server mit zusätzlichen Sicherheitsfunktionen.",
                "Ein Rechner, der mehrere virtuelle Server gleichzeitig betreiben kann.",
                "Eine Software, die wie ein physischer Server agiert, aber virtuell ist.",
                "Ein Gerät zur Lizenzierung von Cloud-Diensten."
            ],
            answer: ["Eine Software, die wie ein physischer Server agiert, aber virtuell ist."],
            points: 1
        } ],
    netzwerk: [ {
            question: "Welche Adressen können aktuell in IP-basierten Windows Netzwerken verwendet werden? (leicht, 2 Punkte)",
            options: ["IPv4 Adressen", "IP Adressen", "IPsec Adressen", "IPv6 Adressen", "Novel Netware Adressen"],
            answer: ["IPv4 Adressen", "IPv6 Adressen"],
            points: 2
        },
        {
            question: "Welche Eigenschaften haben private IP-Adressbereiche? (mittel, 3 Punkte)",
            options: [
                "Werden nicht öffentlich geroutet",
                "Dürfen nicht in LANs verwendet werden",
                "Müssen für Internetverkehr umadressiert werden",
                "Können mehrfach verwendet werden",
                "Nur für Privatpersonen",
                "Keine Unterschiede zu öffentlichen IPs"
            ],
            answer: ["Werden nicht öffentlich geroutet", "Müssen für Internetverkehr umadressiert werden", "Können mehrfach verwendet werden"],
            points: 3
        },
        {
            question: "Welche IP-Adressbereiche sind privat? (mittel, 2 Punkte)",
            options: ["10.0.0.0/8", "192.168.178.0/24", "8.8.8.8/32", "173.16.0.0/16"],
            answer: ["10.0.0.0/8", "192.168.178.0/24"],
            points: 2
        },
        {
            question: "In welcher OSI-Schicht arbeitet Switching? (mittel, 1 Punkt)",
            options: ["Schicht 1 - Physical", "Schicht 2 - Data Link", "Schicht 3 - Network"],
            answer: ["Schicht 2 - Data Link"],
            points: 1
        },
        {
            question: "In welcher OSI-Schicht arbeitet Routing? (leicht, 1 Punkt)",
            options: ["Schicht 3 - Network", "Schicht 4 - Transport", "Nicht im OSI-Modell"],
            answer: ["Schicht 3 - Network"],
            points: 1
        },
        {
            question: "DNS-Server Aufgaben? (leicht, 2 Punkte)",
            options: [
                "DNS-Namen in IPs auflösen",
                "IPs in DNS-Namen auflösen",
                "IPs vergeben",
                "Server-Standorte ermitteln"
            ],
            answer: ["DNS-Namen in IPs auflösen", "IPs in DNS-Namen auflösen"],
            points: 2
        },
        {
            question: "Grundfunktionen eines DNS-Servers? (mittel, 3 Punkte)",
            options: ["Forward Lookup", "Reverse Lookup", "Encryption", "Forwarding"],
            answer: ["Forward Lookup", "Reverse Lookup", "Forwarding"],
            points: 3
        },
        {
            question: "IPv4-Adressierung für alle Hosts? (leicht, 1 Punkt)",
            options: ["Broadcast", "Multicast", "Unicast"],
            answer: ["Broadcast"],
            points: 1
        },
        {
            question: "DHCP-Server Aufgabe? (mittel, 1 Punkt)",
            options: [
                "Vollständige IP-Konfiguration liefern",
                "Nur IP-Adressen vergeben",
                "DNS-Server informieren"
            ],
            answer: ["Vollständige IP-Konfiguration liefern"],
            points: 1
        },
        {
            question: "DHCP-System Komponenten? (mittel, 1 Punkt)",
            options: [
                "Server, Client, Relay Agent",
                "Transmitter, Receiver, Parent",
                "Server, Domain-Controller, DNS"
            ],
            answer: ["Server, Client, Relay Agent"],
            points: 1
        },
        {
            question: "Default Gateway Funktionen? (mittel, 2 Punkte)",
            options: [
                "Einschränkung bei Nichtverwendung",
                "Weiterleitung zu anderen Netzen",
                "Firewall-Funktion",
                "Unwichtig für Netzwerkkommunikation"
            ],
            answer: ["Einschränkung bei Nichtverwendung", "Weiterleitung zu anderen Netzen"],
            points: 2
        } ],
    datenschutz: [ {
            question: "Welche Informationen gelten als personenbezogene Daten?",
            options: ["Daten, die sich auf eine identifizierte oder identifizierbare Person beziehen", "Daten, die sich nur auf Unternehmen beziehen", "Anonymisierte Daten", "Öffentlich zugängliche Informationen"],
            answer: ["Daten, die sich auf eine identifizierte oder identifizierbare Person beziehen"],
            points: 1
        },
        {
            question: "Welche der folgenden Informationen ist kein Beispiel für personenbezogene Daten?",
            options: ["Name", "Telefonnummer", "E-Mail-Adresse", "Anzahl der Mitarbeiter in einem Unternehmen"],
            answer: ["Anzahl der Mitarbeiter in einem Unternehmen"],
            points: 1
        },
        {
            question: "Wie werden personenbezogene Daten geschützt?",
            options: ["Durch die Einhaltung von Datenschutzgesetzen", "Durch die Verwendung von Passwörtern", "Durch Verschlüsselung", "Durch Anonymisierung"],
            answer: ["Durch die Einhaltung von Datenschutzgesetzen"],
            points: 1
        },
        {
            question: "Welche der folgenden Informationen kann als 'sensible personenbezogene Daten' betrachtet werden?",
            options: ["Hobbys", "Lieblingsfarbe", "Religiöse Überzeugungen", "Lieblingsmusik"],
            answer: ["Religiöse Überzeugungen"],
            points: 1
        },
        {
            question: "Was ist der Zweck der Verschlüsselung von personenbezogenen Daten?",
            options: ["Schutz vor versehentlichem Löschen", "Schutz vor Cyber-Angriffen", "Schutz vor Datenverlust", "Schutz vor Veränderungen"],
            answer: ["Schutz vor Cyber-Angriffen"],
            points: 1
        },
        {
            question: "Was ist ein gutes Passwort?",
            options: ["Ein Name einer bekannten Person", "Eine einfache Zahlenreihe", "Eine Kombination aus Buchstaben, Zahlen und Sonderzeichen", "Ein einfaches Wort"],
            answer: ["Eine Kombination aus Buchstaben, Zahlen und Sonderzeichen"],
            points: 1
        },
        {
            question: "Was ist eine Firewall?",
            options: ["Ein physisches Sicherheitssystem", "Ein Programm zur Erstellung von Passwörtern", "Ein Schutzmechanismus vor unerwünschtem Datenverkehr", "Ein Werkzeug zur Wiederherstellung von Daten"],
            answer: ["Ein Schutzmechanismus vor unerwünschtem Datenverkehr"],
            points: 1
        },
        {
            question: "Was ist eine Datensicherung?",
            options: ["Ein Verfahren zur Vermeidung von Datenverlust", "Ein Prozess zur Entfernung von unerwünschten Daten", "Ein Schutzmechanismus vor unerwünschtem Datenverkehr", "Eine Methode zur Vermeidung von Datenlecks"],
            answer: ["Ein Verfahren zur Vermeidung von Datenverlust"],
            points: 1
        },
        {
            question: "Wie wird ein Drittdienstleister gemäß DSGVO bezeichnet?",
            options: ["Auftragsverarbeiter", "Datenverantwortlicher", "Datenschutzbeauftragter", "Datenempfänger"],
            answer: ["Auftragsverarbeiter"],
            points: 1
        },
        {
            question: "Welche Verpflichtung hat ein Datenverantwortlicher gegenüber einem Datenverarbeiter gemäß DSGVO?",
            options: ["Eine Datenschutz-Folgenabschätzung durchzuführen", "Einen schriftlichen Vertrag abzuschließen", "Eine Datenschutzverletzung zu melden", "Die Datenschutz-Grundverordnung einzuhalten"],
            answer: ["Einen schriftlichen Vertrag abzuschließen"],
            points: 1
        },
        {
            question: "Wofür haftet ein Datenverarbeiter gemäß DSGVO?",
            options: ["Für die Einhaltung der gesamten DSGVO", "Für die Einhaltung der im Vertrag festgelegten Verarbeitungsbedingungen", "Für die Einhaltung der von der betroffenen Person erteilten Einwilligung", "Für die Einhaltung der von der Aufsichtsbehörde festgelegten Anforderungen"],
            answer: ["Für die Einhaltung der im Vertrag festgelegten Verarbeitungsbedingungen"],
            points: 1
        },
        {
            question: "Welche Anforderung muss ein Datenverarbeiter gemäß DSGVO erfüllen, bevor er einen Unterauftragnehmer beauftragt?",
            options: ["Die Zustimmung des Datenverantwortlichen einholen", "Eine Datenschutz-Folgenabschätzung durchführen", "Die betroffenen Personen über den Unterauftragnehmer informieren", "Die Zustimmung der Aufsichtsbehörde einholen"],
            answer: ["Die Zustimmung des Datenverantwortlichen einholen"],
            points: 1
        },
        {
            question: "Was ist ein Verfahrensverzeichnis?",
            options: ["Eine Liste aller Mitarbeiter eines Unternehmens", "Eine Liste aller betrieblichen Prozesse, bei denen personenbezogene Daten verarbeitet werden", "Eine Liste aller Kunden eines Unternehmens", "Eine Liste aller Lieferanten eines Unternehmens"],
            answer: ["Eine Liste aller betrieblichen Prozesse, bei denen personenbezogene Daten verarbeitet werden"],
            points: 1
        },
        {
            question: "Wer ist in der Regel für die Erstellung des Verfahrensverzeichnisses verantwortlich?",
            options: ["Die Datenschutzbehörde", "Der externe Datenschutzbeauftragte", "Der Betriebsrat", "Der Verantwortliche im Unternehmen"],
            answer: ["Der Verantwortliche im Unternehmen"],
            points: 1
        },
        {
            question: "Welche Informationen müssen im Verfahrensverzeichnis enthalten sein?",
            options: ["Name und Anschrift aller Mitarbeiter im Unternehmen", "Verarbeitungszwecke, Kategorien betroffener Personen und Kategorien personenbezogener Daten", "Alle Verträge mit Lieferanten", "Datum und Uhrzeit jeder Verarbeitung von personenbezogenen Daten"],
            answer: ["Verarbeitungszwecke, Kategorien betroffener Personen und Kategorien personenbezogener Daten"],
            points: 1
        },
        {
            question: "Wie oft muss das Verfahrensverzeichnis aktualisiert werden?",
            options: ["Jährlich", "Alle 2 Jahre", "Alle 3 Jahre", "Bei Bedarf und bei Änderungen"],
            answer: ["Bei Bedarf und bei Änderungen"],
            points: 1
        },
        {
            question: "Was ist der Zweck von Double Opt-In?",
            options: ["Verkauf von personenbezogenen Daten", "Zustimmung einholen", "Werbung versenden", "Verträge abschließen"],
            answer: ["Zustimmung einholen"],
            points: 1
        },
        {
            question: "Muss der Empfänger einer E-Mail nach der Anmeldung bestätigen, dass er den Newsletter tatsächlich erhalten möchte?",
            options: ["Ja", "Nein", "Nur wenn er möchte", "Es ist optional"],
            answer: ["Ja"],
            points: 1
        },
        {
            question: "Was passiert, wenn der Empfänger die Anmeldung nicht bestätigt?",
            options: ["Der Empfänger erhält den Newsletter trotzdem.", "Die Anmeldung wird abgelehnt.", "Die Anmeldung wird automatisch bestätigt.", "Der Empfänger muss sich erneut anmelden."],
            answer: ["Die Anmeldung wird abgelehnt."],
            points: 1
        },
        {
            question: "Ist Double Opt-In ein gesetzliches Erfordernis nach der DSGVO?",
            options: ["Ja", "Nein", "Nur für bestimmte Branchen", "Nur in bestimmten Ländern"],
            answer: ["Ja"],
            points: 1
        },
        {
            question: "Wofür haftet der Datenschutzbeauftragte?",
            options: ["Der Datenschutzbeauftragte haftet für Fehler in der Beratung, wenn er seine Aufgaben grob fahrlässig oder vorsätzlich verletzt.", "Der Datenschutzbeauftragte haftet nicht persönlich für Verstöße, die durch das Unternehmen oder die Behörde begangen werden.", "Der Datenschutzbeauftragte haftet nicht für die Entscheidungen der Geschäftsführung"],
            answer: ["Der Datenschutzbeauftragte haftet für Fehler in der Beratung, wenn er seine Aufgaben grob fahrlässig oder vorsätzlich verletzt."],
            points: 1
        } ],
    alle: []
};

quizData.alle = [...quizData.scripting, ...quizData.system, ...quizData.netzwerk, ...quizData.datenschutz];

function loadQuiz(quizId) {
    currentQuiz = quizId === 'alle' 
        ? [...quizData.alle] 
        : [...quizData[quizId]];
    
    currentQuestionIndex = 0;
    score = 0;
    
    document.getElementById('startseite').style.display = 'none';
    document.getElementById('quizseite').style.display = 'block';
    document.getElementById('quiz').style.display = 'block';
    
    document.getElementById('quiz-title').textContent = quizId === 'alle' 
        ? "Mega-Quiz (Alle Themen)" 
        : document.querySelector(`button[onclick="loadQuiz('${quizId}')"]`).textContent;

    document.getElementById("progress-bar").style.width = "0%";
    document.getElementById("score").textContent = `Punktestand: ${score}`;
    
    loadQuestion();
}

function loadQuestion() {
    const question = currentQuiz[currentQuestionIndex];
    const optionsDiv = document.getElementById("options");
    
    optionsDiv.innerHTML = "";
    document.getElementById("next").disabled = true;
    document.getElementById("question").textContent = question.question;

    question.options.forEach((option, index) => {
        const label = document.createElement("label");
        label.className = "option";
        
        const input = document.createElement("input");
        input.type = question.answer.length > 1 ? "checkbox" : "radio";
        input.name = "answer";
        input.id = `option-${currentQuestionIndex}-${index}`;
        
        const span = document.createElement("span");
        span.textContent = option;

        label.appendChild(input);
        label.appendChild(span);
        label.htmlFor = input.id;

        input.addEventListener('change', () => {
            const hasSelection = document.querySelectorAll('input:checked').length > 0;
            document.getElementById("next").disabled = !hasSelection;
        });

        optionsDiv.appendChild(label);
    });

    const progress = ((currentQuestionIndex + 1) / currentQuiz.length) * 100;
    document.getElementById("progress-bar").style.width = `${progress}%`;
    document.getElementById("progress-text").textContent = 
        `${Math.round(progress)}% abgeschlossen (Frage ${currentQuestionIndex + 1}/${currentQuiz.length})`;
}

function nextQuestion() {
    const selected = Array.from(document.querySelectorAll('input:checked'))
                         .map(input => input.parentElement.querySelector('span').textContent.trim());
    
    const correctAnswers = currentQuiz[currentQuestionIndex].answer;
    
    // Validierung
    const isCorrect = selected.length === correctAnswers.length &&
                      correctAnswers.every(a => selected.includes(a)) &&
                      selected.every(a => correctAnswers.includes(a));

    // Visuelles Feedback
    document.querySelectorAll('.option').forEach(label => {
        const spanText = label.querySelector('span').textContent.trim();
        label.classList.remove('correct', 'incorrect');
        
        if (correctAnswers.includes(spanText)) {
            label.classList.add('correct');
        } 
        if (label.querySelector('input').checked && !correctAnswers.includes(spanText)) {
            label.classList.add('incorrect');
        }
    });

    // Punkte berechnen
    if (isCorrect) score += currentQuiz[currentQuestionIndex].points;
    document.getElementById("score").textContent = `Punktestand: ${score}`;

    // Nächste Frage oder Ende
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuiz.length) {
            loadQuestion();
        } else {
            const maxPoints = currentQuiz.reduce((sum, q) => sum + q.points, 0);
            alert(`Quiz beendet!\nEndstand: ${score} von ${maxPoints} Punkten`);
            restartQuiz();
        }
    }, 2000);
}

function restartQuiz() {
    document.getElementById('startseite').style.display = 'block';
    document.getElementById('quizseite').style.display = 'none';
    document.getElementById('quiz').style.display = 'none';
    document.getElementById("progress-bar").style.width = "0%";
    document.getElementById("progress-text").textContent = "";
    currentQuestionIndex = 0;
    score = 0;
}