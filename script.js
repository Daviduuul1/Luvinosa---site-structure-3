const complimentsContainer = document.getElementById("compliments");
const overlay = document.getElementById("recaptcha-overlay");
const mainContent = document.getElementById("main-content");
const recaptcha = document.getElementById("recaptcha");

// Listă de complimente (unul corect)
const compliments = [
    { text: "Aveți un sens de stil uimitor!", correct: false },
    { text: "Sunteți niște persoane incredibil de grijulii!", correct: true },
    { text: "Creativitatea voastră este de inspirat!", correct: false },
    { text: "Faceți lumea un loc mai bun!", correct: false },
];

// Amestecă complimentele
compliments.sort(() => Math.random() - 0.5);

// Renderizează complimentele
compliments.forEach(compliment => {
    const div = document.createElement("div");
    div.className = "compliment";
    div.textContent = compliment.text;

    div.addEventListener("click", () => {
        // Resetează stilurile pentru toate complimentele
        document.querySelectorAll(".compliment").forEach(el =>
            el.classList.remove("correct", "wrong")
        );

        if (compliment.correct) {
            div.classList.add("correct");

            // Arată imediat conținutul principal (cu animație de fade-in)
            mainContent.classList.add("visible");

            // Adaugă clasa pentru a începe animația overlay-ului
            setTimeout(() => {
                overlay.classList.add("hidden");
            }, 0); // Overlay-ul începe să dispară imediat

            // Începe efectul de fade-in pentru reCaptcha
            setTimeout(() => {
                recaptcha.style.display = "block"; // Asigură-te că este vizibil
                recaptcha.classList.add("fade-in"); // Adaugă clasa pentru fade-in
            }, 0); // Începe imediat tranziția

            // Începe animația de mișcare pentru reCaptcha
            setTimeout(() => {
                recaptcha.style.transform = "translateY(0)"; // Mișcă-l în centru
            }, 500); // După ce efectul de fade-in începe

            // După terminarea animației de dispariție
            setTimeout(() => {
                overlay.style.display = "none"; // Ascunde complet overlay-ul
                document.body.style.overflow = "auto"; // Permite scroll-ul
            }, 2500); // După finalizarea animației de dispariție (2.5 secunde)
        } else {
            // Subliniază răspunsul greșit
            div.classList.add("wrong");
            setTimeout(() => {
                document.querySelectorAll(".compliment").forEach(el =>
                    el.classList.remove("correct", "wrong")
                );
            }, 1000); // Reset după 1 secundă
        }
    });

    complimentsContainer.appendChild(div);
});
