const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElements.join(" ");
}

const manageSpinner = (status) => {
  if (status === true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("vocab-container").classList.add("hidden");
  } else {
    document.getElementById("vocab-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
}

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
    .then((res) => res.json()) // promise of json data
    .then((jsonData) => displayLessons(jsonData.data));
};

const removeActive = () => {
    const lessonBtn = document.querySelectorAll(".lesson-btn");
    lessonBtn.forEach(btn => {
        btn.classList.remove("active");
    });
}

const loadLevelWord = (id) => {
  manageSpinner(true);
  removeActive();
  const clickedBtn = document.getElementById(`lesson-btn-${id}`);
  clickedBtn.classList.add("active");

  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((jsonData) => displayLevelWord(jsonData.data));
};

const loadWordDetail = async(id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
}

const displayWordDetails = (wordDetails) => {
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
    <div class="border-1 border-gray-200 p-3 mb-2 rounded-lg space-y-3">
              <div>
                <h1 class="font-inter font-bold text-2xl">
                  ${wordDetails.word} (<img
                    class="w-5 inline-block"
                    src="./assets/fi-ss-microphone.png"
                    alt=""
                  />: <span class="font-bangla">${wordDetails.pronunciation}</span>)
                </h1>
              </div>

              <div>
                <p class="font-inter">Meaning</p>
                <p class="font-bangla">${wordDetails.meaning}</p>
              </div>

              <div>
                <p class="font-inter">Example</p>
                <p class="font-inter">
                  ${wordDetails.sentence}
                </p>
              </div>

              <div>
                <p class="font-bangla">সমার্থক শব্দগুলো</p>
                <div class="">
                  ${createElements(wordDetails.synonyms)}
                </div>
              </div>
              
            </div>
            <button class="btn btn-primary">Complete Learning</button>
    `;
    document.getElementById("my_modal").showModal();
}

const displayLevelWord = (words) => {
  const vocabContainer = document.getElementById("vocab-container");
  vocabContainer.innerHTML = "";

  if (words.length === 0) {
    vocabContainer.innerHTML = `
    <div class="py-10 w-95 mx-auto md:w-full col-span-full">
        <img class="mx-auto" src="./assets/alert-error.png" alt="">
        <p class="font-bangla text-[#79716b] mt-3">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h1 class="font-bangla text-3xl mt-5 font-medium">নেক্সট Lesson এ যান!</h1>
    </div>
    `;
    manageSpinner(false);
  }

  words.forEach((word) => {
    const wordDiv = document.createElement("div");
    wordDiv.innerHTML = `
        <div class="bg-white rounded-lg p-8 shadow-sm cursor-pointer">
            <h2 class="font-bold text-2xl font-inter">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="mt-3 mb-5 font-medium font-inter">Meaning / Pronunciation</p>
            <h2 class="font-bangla font-semibold text-2xl text-[#464649]">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"}"</h2>
            <div class="mt-10 flex justify-between">
                <div onclick="loadWordDetail(${word.id})" class="bg-blue-100 p-3 rounded-md hover:bg-green-200 cursor-pointer">
                    <img class="w-4" src="./assets/i-icon.png" alt="">
                </div>
                <div class="bg-blue-100 p-3 rounded-md hover:bg-green-200 cursor-pointer">
                    <img class="w-4" src="./assets/fi-sr-volume.png" alt="">
                </div>
            </div>
        </div>
        `;
    vocabContainer.appendChild(wordDiv);
  });
  manageSpinner(false);
};

const displayLessons = (lessons) => {
  // 1. Get the container & empty it
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  // 2. Get into every lesson
  lessons.forEach((lesson) => {
    // 3. Create Element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
            <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="nav-btn btn btn-outline btn-primary lesson-btn">
                <img src="./assets/fa-book-open.png" alt="" />
                Lesson -${lesson.level_no}
            </button>
        `;
    // 4. Append into container
    levelContainer.appendChild(btnDiv);
  });
};

loadLessons();
