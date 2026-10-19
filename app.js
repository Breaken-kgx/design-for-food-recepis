const searchInput = document.querySelector("#recipe-search");

if (searchInput) {
    const cards = [...document.querySelectorAll(".recipe-card")];
    const searchStatus = document.querySelector(".search-status");
    const emptyMessage = document.querySelector(".empty-search");

    const filterRecipes = () => {
        const query = searchInput.value.trim().toLocaleLowerCase();
        let visibleCount = 0;

        cards.forEach((card) => {
            const matches = card.textContent.toLocaleLowerCase().includes(query);
            card.hidden = !matches;
            visibleCount += Number(matches);
        });

        searchStatus.textContent = `${visibleCount} ${visibleCount === 1 ? "dish" : "dishes"}`;
        emptyMessage.hidden = visibleCount !== 0;
    };

    searchInput.addEventListener("input", filterRecipes);
    filterRecipes();
}

document.querySelectorAll(".recipe-content-inner").forEach((recipe) => {
    const lists = [...recipe.querySelectorAll(".ingredient-list, .instruction-list")];
    const checkboxes = [];

    lists.forEach((list) => {
        const section = list.closest(".recipe-section");
        const progress = document.createElement("div");
        const label = document.createElement("span");
        const bar = document.createElement("progress");
        const items = [...list.querySelectorAll("li")];

        progress.className = "checklist-progress";
        label.className = "checklist-progress-label type-label";
        bar.max = items.length;
        bar.value = 0;
        bar.setAttribute("aria-label", `${section.querySelector("h2").textContent} completed`);
        progress.append(label, bar);
        section.querySelector("h2").after(progress);

        const updateProgress = () => {
            const completed = items.filter((item) => item.querySelector("input").checked).length;
            label.textContent = `${completed} of ${items.length} complete`;
            bar.value = completed;
        };

        items.forEach((item) => {
            const checkbox = document.createElement("input");
            const itemLabel = document.createElement("label");

            checkbox.type = "checkbox";
            checkbox.addEventListener("change", () => {
                item.classList.toggle("is-complete", checkbox.checked);
                updateProgress();
            });

            while (item.firstChild) {
                itemLabel.append(item.firstChild);
            }

            itemLabel.prepend(checkbox);
            item.append(itemLabel);
            checkboxes.push(checkbox);
        });

        updateProgress();
    });

    const resetButton = document.createElement("button");
    resetButton.className = "checklist-reset type-label";
    resetButton.type = "button";
    resetButton.textContent = "Clear progress";
    resetButton.addEventListener("click", () => {
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
            checkbox.closest("li").classList.remove("is-complete");
            checkbox.dispatchEvent(new Event("change"));
        });
    });
    recipe.prepend(resetButton);
});
