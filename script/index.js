const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
    .then((response) => response.json()) // promise of json data
    .then((jsonData) => displayLessons(jsonData.data));
};

const displayLessons = (lessons) => {
    // 1. Get the container & empty it
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    // 2. Get into every lesson
    lessons.forEach(lesson => {
        // 3. Create Element
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <button class="nav-btn btn btn-outline btn-primary">
                <img src="./assets/fa-book-open.png" alt="" />
                Lesson -${lesson.level_no}
            </button>
        `
        // 4. Append into container
        levelContainer.appendChild(btnDiv);
    });
};

loadLessons();