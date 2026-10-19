const searchInput = document.querySelector("#recipe-search");

if (searchInput) {
    const entries = [...document.querySelectorAll(".collection-entry")];
    const searchStatus = document.querySelector("#search-status");
    const emptyMessage = document.querySelector("#empty-search");

    const filterRecipes = () => {
        const query = searchInput.value.trim().toLocaleLowerCase();
        let visibleCount = 0;

        entries.forEach((entry) => {
            const matches = (entry.dataset.search ?? entry.textContent).toLocaleLowerCase().includes(query);
            entry.hidden = !matches;
            visibleCount += Number(matches);
        });

        if (searchStatus) {
            searchStatus.textContent = `${visibleCount} ${visibleCount === 1 ? "dish" : "dishes"}`;
        }

        if (emptyMessage) {
            emptyMessage.hidden = visibleCount !== 0;
        }
    };

    searchInput.addEventListener("input", filterRecipes);
    filterRecipes();
}

const ingredientList = document.querySelector(".ingredient-list");
const instructionList = document.querySelector(".instruction-list");
const clearProgressButton = document.querySelector("#clear-progress");

if (ingredientList && instructionList && clearProgressButton) {
    const ingredientInputs = [...ingredientList.querySelectorAll('input[type="checkbox"]')];
    const instructionInputs = [...instructionList.querySelectorAll('input[type="checkbox"]')];
    const ingredientCount = document.querySelector("#ingredients-count");
    const instructionCount = document.querySelector("#instructions-count");
    const ingredientProgress = document.querySelector("#ingredients-progress");
    const instructionProgress = document.querySelector("#instructions-progress");

    const updateListProgress = (inputs, count, progress) => {
        const completed = inputs.filter((input) => input.checked).length;
        const total = inputs.length;

        if (count) {
            count.textContent = `${completed} of ${total} complete`;
        }

        if (progress) {
            progress.max = total;
            progress.value = completed;
            progress.setAttribute("aria-label", `${completed} of ${total} ${progress.dataset.listName} checked`);
        }
    };

    const updateProgress = () => {
        updateListProgress(ingredientInputs, ingredientCount, ingredientProgress);
        updateListProgress(instructionInputs, instructionCount, instructionProgress);
    };

    [...ingredientInputs, ...instructionInputs].forEach((input) => {
        input.addEventListener("change", updateProgress);
    });

    clearProgressButton.addEventListener("click", () => {
        [...ingredientInputs, ...instructionInputs].forEach((input) => {
            input.checked = false;
        });
        updateProgress();
    });

    updateProgress();
}
