const wrapper = document.getElementById("wrapper");
const selectedContainer = document.getElementById("selectedContainer");
const selectedItemsDiv = document.getElementById("selectedItems");
const clearBtn = document.getElementById("clearBtn");

let selectedItems = [];

console.log(wrapper);
if (!wrapper) {
  console.error("Element with ID 'wrapper' not found.");
} else {
  fetchData();
}
async function fetchData() {
  try {
    const response = await fetch("data.json");
    if (!response.ok) throw new Error("Failed");

    const data = await response.json();
    displayData(data);
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
}
fetchData();
function displayData(fetchData) {
  console.log(fetchData);
  wrapper.innerHTML = "";
  wrapper.innerHTML = fetchData
    .map((eachData, index) => {
      return `
                  <div
          class="flex flex-col md:flex-row lg:flex-row justify-between items-center my-10 md:my-3 lg:my-3 shadow-2xl p-3 rounded-[0.5rem] bg-white relative md:gap-x-6 ${
            index === 0 || index === 1 ? "border-l-4 border-[#5ba4a4]" : ""
          } "
        >
        
    <!-- Left Section -->
        

          <div class="flex flex-col md:flex-row lg:flex-row lg:items-center md:items-center   md:space-x-[1rem] lg:space-x-[2rem] w-full ">
            <img src="${
              eachData.logo
            }" alt="Logo" class="absolute left-5 -top-8 w-[4rem] md:w-[6rem] md:static " />
            <div class="md:ml-0 ml-3 mt-5">
              <div class="flex items-center gap-x-4 md:gap-x-5 lg:gap-5">
                <p class="text-[#5ba4a4] font-bold text-xl md:text-2xl lg:text-2xl">${
                  eachData.company
                }</p>
                ${
                  eachData.new
                    ? `<p class="bg-[#5ba4a4] text-white text-[1rem]  rounded-[1rem] p-1 py-1">NEW!</p>`
                    : ""
                }
                ${
                  eachData.featured
                    ? `<p class="text-white bg-black rounded-[1rem] text-[1rem]  p-1 py-1">FEATURED</p>`
                    : ""
                }


              </div>
              <h1 class="text-xl font-medium">${eachData.position}</h1>
              <div class="flex gap-3 text-[#878d8d]">
                <p>${eachData.postedAt}</p>
                <p>•</p>
                <p>${eachData.contract}</p>
                <p>•</p>
                <p>${eachData.location}</p>
              </div>
            </div>
          </div>
    <!-- Horizontal line (only visible on mobile) -->
          <hr class="block w-full border-t-2 border-gray-300 my-2 sm:hidden" />

             <!-- Right Section -->

          <div
            class="flex md:flex-row lg:flex-row items-center gap-x-4 text-[#5ba4a4] font-semibold text-xl flex-wrap md:flex-wrap lg:flex-nowrap gap-y-3"
          >
          <span class="text-[#5ba4a4] bg-[#eff8f5] p-2 rounded-lg filter-item cursor-pointer">${
            eachData.role
          }</span>

          <span class="text-[#5ba4a4] bg-[#eff8f5] p-2 rounded-lg filter-item cursor-pointer">${
            eachData.level
          }</span>

                  ${eachData.tools
                    .map((tool, index) => {
                      return `<span class="bg-[#eff8f5] p-2 rounded-lg filter-item cursor-pointer"> ${tool}</span>`;
                    })
                    .join("")}

          ${eachData.languages
            .map((lang, index) => {
              return `<span class="bg-[#eff8f5] p-2 rounded-lg filter-item cursor-pointer"> ${lang}</span>`;
            })
            .join("")}

   
          </div>
        </div>
    `;
    })
    .join("");

  // Add event listeners to each filter item
  document.querySelectorAll(".filter-item").forEach((item) => {
    item.addEventListener("click", (event) => {
      const selectedText = event.target.innerText;
      if (!selectedItems.includes(selectedText)) {
        selectedItems.push(selectedText);
        updateSelectedItems();
      }
    });
  });
}

// Function to update selected items row
function updateSelectedItems() {
  if (selectedItems.length > 0) {
    //  Show container when items exist
    selectedContainer.style.display = "flex";
  } else {
    // Hide if empty
    selectedContainer.style.display = "none";
  }
  selectedItemsDiv.innerHTML = selectedItems
    .map(
      (item) =>
        `<span class=" bg-[#eff8f5] text-[#5ba4a4] p-2 rounded-lg my-2 flex items-center gap-3">${item}
            <button
          class="text-white font-bold text-xl hover:bg-[#293938] remove-item bg-[#5ba4a4] rounded-xs" data-value="${item}"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </span>`
    )
    .join("");

  // Attach event listeners to each small X button
  selectedItemsDiv.addEventListener("click", (event) => {
    if (event.target.closest(".remove-item")) {
      const button = event.target.closest(".remove-item");
      const valueToRemove = button.getAttribute("data-value");

      // Filter out the removed item
      selectedItems = selectedItems.filter((item) => item !== valueToRemove);
      // Update UI
      updateSelectedItems();
    }
  });
}

// Clear all selected items when the "X" button is clicked
clearBtn.addEventListener("click", () => {
  selectedItems = [];
  updateSelectedItems();
});
