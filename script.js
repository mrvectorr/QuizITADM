let currentQuestionIndex = 0;
let score = 0;
let currentQuiz = [];
let incorrectQuestions = []; // Neue Globalvariable für falsche Fragen
const QUESTIONS_PER_CATEGORY = 4; // 👈 Neue Konstante

const quizData = {
    linux: [
        // Systemboot und Kernel
        {
            question: "Welches Programm wird nach dem BIOS während des System-Bootvorgangs ausgeführt?",
            options: ["Bootloader", "init-Programm", "Kernel"],
            answer: ["Bootloader"],
            points: 1
        },
        {
            question: "Was ist der Name der Konfigurationsdatei für den GNU GRUB Bootloader?",
            options: ["grub.cfg", "grubenv"],
            answer: ["grub.cfg"],
            points: 1
        },

        // Systemd und Runlevel
        {
            question: "Mit welchem Befehl können Sie vom graphical.target zum multi-user.target wechseln?",
            options: ["systemctl isolate multi-user.target", "systemctl isolate graphical.target"],
            answer: ["systemctl isolate multi-user.target"],
            points: 1
        },
        {
            question: "Was ist der Zweck von Runlevel 0 in Linux?",
            options: ["Neustart", "Shutdown (Herunterfahren)", "Graphischer Modus (graphical.target)"],
            answer: ["Shutdown (Herunterfahren)"],
            points: 1
        },
        {
            question: "Mit welchem Befehl kann man die Linux-Maschine herunterfahren?",
            options: ["shutdown", "shutdown -r", "systemctl poweroff", "reboot"],
            answer: ["shutdown", "systemctl poweroff"],
            points: 2
        },
        {
            question: "Mit welchem Befehl können Sie die Linux-Maschine neu starten?",
            options: ["poweroff", "telinit 0", "reboot", "systemctl halt", "shutdown -r"],
            answer: ["reboot", "shutdown -r"],
            points: 2
        },

        // Dateioperationen und Links
        {
            question: "Was passiert, wenn die Quelldatei eines symbolischen Links gelöscht wird?",
            options: [
                "Der symbolische Link bleibt funktionsfähig",
                "Der symbolische Link wird als 'broken link' angezeigt",
                "Der symbolische Link wird automatisch zu einem Hardlink"
            ],
            answer: ["Der symbolische Link wird als 'broken link' angezeigt"],
            points: 1
        },
        {
            question: "Welcher Befehl kann versteckte Dateien und Ordner auflisten?",
            options: ["ls -l", "ls -la", "ls -lh"],
            answer: ["ls -la"],
            points: 1
        },
        {
            question: "Mit welchem Befehl können Sie eine Datei umbenennen?",
            options: ["cp", "rm", "mv"],
            answer: ["mv"],
            points: 1
        },
        {
            question: "Welcher Befehl wird verwendet, um ein Hardlink zu erstellen?",
            options: ["ls", "ln", "ln -s"],
            answer: ["ln"],
            points: 1
        },
        {
            question: "Welcher Befehl wird verwendet, um ein Softlink (symbolischer Link) zu erstellen?",
            options: ["ls", "ln", "ln -s"],
            answer: ["ln -s"],
            points: 1
        },
        {
            question: "Welcher Befehl wird verwendet, um Dateien zu löschen?",
            options: ["delete", "rm", "erase"],
            answer: ["rm"],
            points: 1
        },
        {
            question: "Welcher Befehl wird verwendet, um leere Verzeichnisse zu löschen?",
            options: ["rdir", "remove", "rmdir"],
            answer: ["rmdir"],
            points: 1
        },
        {
            question: "Welcher Befehl wird verwendet, um den Inhalt von Verzeichnissen aufzulisten?",
            options: ["mkdir", "ln", "ls"],
            answer: ["ls"],
            points: 1
        },
        {
            question: "Mit welchem Befehl können Sie Dateien/Ordner verschieben?",
            options: ["mv", "cp", "rm -rf"],
            answer: ["mv"],
            points: 1
        },
        {
            question: "Mit welchem Befehl können Sie Dateien/Ordner kopieren?",
            options: ["mv", "cp", "rm -rf"],
            answer: ["cp"],
            points: 1
        },

        // Archivierung und Kompression
        {
            question: "Welcher Befehl wird verwendet, um Dateien/Ordner zu archivieren?",
            options: ["tar -cf", "tar -tvf", "tar -xvf"],
            answer: ["tar -cf"],
            points: 1
        },
        {
            question: "Welcher Befehl wird verwendet, um Archive zu extrahieren?",
            options: ["tar -cf", "tar -tvf", "tar -xvf"],
            answer: ["tar -xvf"],
            points: 1
        },
        {
            question: "Welcher Befehl wird verwendet, um Archive zu komprimieren?",
            options: ["gzip", "gunzip", "tar -cf"],
            answer: ["gzip"],
            points: 1
        },
        {
            question: "Welcher Befehl wird verwendet, um komprimierte Archive zu extrahieren?",
            options: ["gzip", "gunzip", "tar -cf"],
            answer: ["gunzip"],
            points: 1
        },

        // Berechtigungen und Prozesse
        {
            question: "Was bedeutet der Befehl chmod 775 datei?",
            options: [
                "User/Group/Others: rwx/rwx/rw-",
                "User/Group/Others: rwx/rwx/r-x",
                "User/Group/Others: rwx/rwx/r--"
            ],
            answer: ["User/Group/Others: rwx/rwx/r-x"],
            points: 1
        },
        {
            question: "Mit welchem Befehl kann man einen Prozess beenden?",
            options: ["renice", "nice", "kill"],
            answer: ["kill"],
            points: 1
        },
        {
            question: "Welcher Befehl wird verwendet, um den 'Niceness'-Wert eines Prozesses zu ändern?",
            options: ["renice -10 -p 2398", "nice -10 2398", "kill 2398"],
            answer: ["renice -10 -p 2398"],
            points: 1
        },
        {
            question: "Mit dem Befehl jobs kann man:",
            options: [
                "Prozesse, die der angemeldete Benutzer gestartet hat, auflisten",
                "Prozesse beenden",
                "Den 'Niceness'-Wert eines Prozesses ändern"
            ],
            answer: ["Prozesse, die der angemeldete Benutzer gestartet hat, auflisten"],
            points: 1
        },

        // Verschiedenes
        {
            question: "Mit welchem Befehl wird eine Umgebungsvariable bekannt gemacht?",
            options: ["export", "unset"],
            answer: ["export"],
            points: 1
        },
        {
            question: "Wie werden Umgebungsvariablen standardmäßig geschrieben?",
            options: ["Großgeschrieben", "Kleingeschrieben"],
            answer: ["Großgeschrieben"],
            points: 1
        },
        {
            question: "Was bedeutet #!/bin/bash in einem Skript?",
            options: ["Shebang", "Hashbang", "Shehash"],
            answer: ["Shebang"],
            points: 1
        },

        // Geschichte
        {
            question: "In welchem Jahr begann die Entwicklung von UNIX?",
            options: ["1991", "1960", "1969"],
            answer: ["1969"],
            points: 1
        },

        // Paketverwaltung (YUM)
        {
            question: "Welche Optionen können mit dem yum-Befehl verwendet werden, um das System zu aktualisieren?",
            options: ["install", "update", "upgrade", "check-update"],
            answer: ["update", "upgrade"],
            points: 2
        },

        // Datei-Vergleich
        {
            question: "Mit diff können zwei Dateien verglichen werden. Auf welcher Basis erfolgt der Vergleich?",
            options: ["Byte für Byte", "Zeile für Zeile"],
            answer: ["Zeile für Zeile"],
            points: 1
        }
    ],
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
            answer: ["5,6"],
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
            options: ["<title>;", "<function>;", "<script>;", "<head>;"],
            answer: ["<script>;"],
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
    itgrundlagen: [
        {
            question: "Was sind analoge Daten Speichermedien? (leicht, 2 Punkte)",
            options: [
                "Schallplatten",
                "Festplatten",
                "Fotoabzüge",
                "USB-Sticks"
            ],
            answer: ["Schallplatten", "Fotoabzüge"],
            points: 2
        },
        {
            question: "Welche Aussagen zur digitalen Datenübertragung sind richtig? (mittel, 3 Punkte)",
            options: [
                "Digitale Daten können Online und Offline übertragen werden",
                "Daten können nicht über Netzwerke (LAN's) übertragen werden",
                "Für Online Datenübertragungen ist immer eine Verbindung nötig",
                "Offline Datenübertragungen erfolgt immer mit Dateien",
                "Digitalen Daten lassen sich nicht übertragen"
            ],
            answer: [
                "Digitale Daten können Online und Offline übertragen werden",
                "Für Online Datenübertragungen ist immer eine Verbindung nötig"
            ],
            points: 3
        },
        {
            question: "Welche Aufgaben hat ein Betriebssystem? (mittel, 2 Punkte)",
            options: [
                "Intuitive Bedienbarkeit",
                "Verwaltung der internen und externen Hardwarekomponenten",
                "Bereitstellung von Social Media Netzwerken",
                "Steuerung der System- und Anwendungs-Programme"
            ],
            answer: [
                "Verwaltung der internen und externen Hardwarekomponenten",
                "Steuerung der System- und Anwendungs-Programme"
            ],
            points: 2
        },
        {
            question: "Welche Aussagen über Algorithmen sind richtig? (leicht, 2 Punkte)",
            options: [
                "Algorithmen können von Computern verarbeitet werden",
                "In der realen Arbeitswelt gibt es keine Algorithmen",
                "Algorithmen sind nur ein theoretisches Konstrukt der IT",
                "Algorithmen definieren die Arbeitsweise von Programmen"
            ],
            answer: [
                "Algorithmen können von Computern verarbeitet werden",
                "Algorithmen definieren die Arbeitsweise von Programmen"
            ],
            points: 2
        },
        {
            question: "Wie heißen die drei booleschen Grundoperatoren? (leicht, 3 Punkte)",
            options: [
                "OR",
                "XOR",
                "NOT",
                "AND"
            ],
            answer: ["OR", "NOT", "AND"],
            points: 3
        },
        {
            question: "Welche Zahlen sind korrekt? (leicht, 2 Punkte)",
            options: [
                "Hexadezimal 0A2F",
                "Hexadezimal 123G",
                "Oktal 1827",
                "Binär 10101010"
            ],
            answer: ["Hexadezimal 0A2F", "Binär 10101010"],
            points: 2
        },
        {
            question: "Wie heißen die Betriebssystem Architekturmodelle? (mittel, 2 Punkte)",
            options: [
                "Zwiebelmodell",
                "Schichtenmodell",
                "Orangenmodell",
                "Schalenmodell"
            ],
            answer: ["Schichtenmodell", "Schalenmodell"],
            points: 2
        },
        {
            question: "Welche Hypervisor Architektur wird meistens für Servervirtualisierung verwendet? (leicht, 1 Punkt)",
            options: [
                "VLAN",
                "Hosted",
                "Bare Metal"
            ],
            answer: ["Bare Metal"],
            points: 1
        },
        {
            question: "Welche elektronischen Bauteile werden in modernen Computern verwendet? (mittel, 2 Punkte)",
            options: [
                "Röhren",
                "Relais",
                "Transistoren",
                "Mikroprozessoren"
            ],
            answer: ["Transistoren", "Mikroprozessoren"],
            points: 2
        },
        {
            question: "Welche Aussagen über Bytes sind korrekt? (mittel, 2 Punkte)",
            options: [
                "Ein Byte hat 13 Bit",
                "Ein Byte hat 8 Bit",
                "Ein Kibibyte sind 1.000 Byte",
                "Ein Megabyte sind 1.000.000 Byte"
            ],
            answer: [
                "Ein Byte hat 8 Bit",
                "Ein Megabyte sind 1.000.000 Byte"
            ],
            points: 2
        },
    ],
    alle: []
};

// 1. Hilfsfunktionen für Zufallsauswahl
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getRandomQuestions(category, count) {
    const availableQuestions = [...quizData[category]];
    return shuffleArray(availableQuestions).slice(0, Math.min(count, availableQuestions.length));
}

// 2. Dynamische Aktualisierung der Mega-Quiz Fragen
function updateMegaQuiz() {
    quizData.alle = [];
    const categories = ['itgrundlagen', 'linux', 'netzwerk', 'datenschutz', 'scripting', 'system'];
    
    categories.forEach(category => {
        const randomQuestions = getRandomQuestions(category, QUESTIONS_PER_CATEGORY);
        quizData.alle.push(...randomQuestions);
    });
    
    quizData.alle = shuffleArray(quizData.alle);
}

// categoryMap vor loadQuiz definieren
const categoryMap = {
    itgrundlagen: { 
        title: "IT-Grundlagen", 
        icon: "fa-laptop-code" 
    },
    linux: { 
        title: "Linux", 
        icon: "fa-terminal" 
    },
    netzwerk: { 
        title: "Netzwerk", 
        icon: "fa-network-wired" 
    },
    datenschutz: { 
        title: "Datenschutz", 
        icon: "fa-shield-alt" 
    },
    scripting: { 
        title: "Scripting", 
        icon: "fa-code" 
    },
    system: { 
        title: "Systeme", 
        icon: "fa-server" 
    },
    alle: { 
        title: "Random",
        icon: "fa-star" 
    }
};

// 3. Modifizierte loadQuiz-Funktion
function loadQuiz(quizId) {
    if (!categoryMap[quizId]) {
        alert("Ungültige Quiz-Kategorie!");
        restartQuiz();
        return;
    }

    // Mega-Quiz: Neue Zufallsfragen generieren
    if (quizId === 'alle') {
        updateMegaQuiz();
        currentQuiz = [...quizData.alle];
    } else {
        currentQuiz = [...quizData[quizId]];
    }

    if (currentQuiz.length === 0) {
        alert("Keine Fragen verfügbar!");
        restartQuiz();
        return;
    }

    // Reset Variablen
    currentQuestionIndex = 0;
    score = 0;
    incorrectQuestions = [];

    // UI Initialisierung
    const category = categoryMap[quizId];
    document.getElementById('quiz-title').innerHTML = `
        <i class="fas ${category.icon}"></i>
        ${category.title}
    `;
    
    document.getElementById('startseite').style.display = 'none';
    document.getElementById('quizseite').style.display = 'block';
    document.getElementById('quiz').style.display = 'block';
    
    // Progress zurücksetzen
    updateProgress();
    loadQuestion();
}

// 4. Überarbeitete nextQuestion-Funktion
function nextQuestion() {
    const selected = Array.from(document.querySelectorAll('input:checked'))
                         .map(input => input.parentElement.querySelector('span').textContent.trim());
    
    const currentQuestion = currentQuiz[currentQuestionIndex];
    const isCorrect = checkAnswer(selected, currentQuestion.answer);

    // Punkte hinzufügen, wenn Antwort korrekt
    if (isCorrect) {
        score += currentQuestion.points;
    }

    // Falsche Frage merken
    if (!isCorrect) {
        incorrectQuestions.push(currentQuestion);
    }

    // Visuelles Feedback
    showAnswerFeedback(currentQuestion.answer);

    // Verzögerung vor nächster Frage
    setTimeout(() => {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < currentQuiz.length) {
            loadQuestion();
        } else {
            handleQuizCompletion();
        }
    }, 1500);
}

function checkAnswer(selected, correctAnswers) {
    return selected.length === correctAnswers.length &&
           selected.every(a => correctAnswers.includes(a)) &&
           correctAnswers.every(a => selected.includes(a));
}

function showAnswerFeedback(correctAnswers) {
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
}

// 5. Neue Funktion für Quiz-Abschluss
function handleQuizCompletion() {
    if (incorrectQuestions.length > 0) {
        // Wiederhole falsche Fragen
        currentQuiz = [...incorrectQuestions];
        incorrectQuestions = [];
        currentQuestionIndex = 0;
        alert(`⚠️ ${currentQuiz.length} falsche Fragen werden wiederholt!`);
        updateProgress();
        loadQuestion();
    } else {
        // Quiz wirklich beenden
        const maxPoints = currentQuiz.reduce((sum, q) => sum + q.points, 0);
        alert(`🎉 Quiz beendet!\nPunktestand: ${score}/${maxPoints}`);
        restartQuiz();
    }
}

// 6. Modifizierte loadQuestion mit Wiederholungs-Markierung
function loadQuestion() {
    const question = currentQuiz[currentQuestionIndex];
    const optionsDiv = document.getElementById("options");
    
    // Fragekarte zurücksetzen
    optionsDiv.innerHTML = "";
    document.getElementById("next").disabled = true;
    document.getElementById("question").textContent = question.question;

    // Markierung für wiederholte Fragen
    const questionCard = document.querySelector('.question-card');
    questionCard.classList.toggle('repeated-question', 
        incorrectQuestions.some(q => q.question === question.question));

    // Optionen erstellen
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
            document.getElementById("next").disabled = 
                document.querySelectorAll('input:checked').length === 0;
        });

        optionsDiv.appendChild(label);
    });

    updateProgress();
}

// 7. Progress-Update Funktion
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / currentQuiz.length) * 100;
    document.getElementById("progress-bar").style.width = `${progress}%`;
    document.getElementById("progress-text").textContent = 
        `${Math.round(progress)}% abgeschlossen (Frage ${currentQuestionIndex + 1}/${currentQuiz.length})`;
    document.getElementById("score").textContent = `Punktestand: ${score}`;
}

// 8. Restart-Funktion erweitert
function restartQuiz() {
    document.getElementById('startseite').style.display = 'block';
    document.getElementById('quizseite').style.display = 'none';
    document.getElementById('quiz').style.display = 'none';
    document.getElementById("progress-bar").style.width = "0%";
    document.getElementById("progress-text").textContent = "";
    currentQuestionIndex = 0;
    score = 0;
    incorrectQuestions = [];
}
