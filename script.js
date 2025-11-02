const form = document.getElementById("quizForm");
const result = document.getElementById("result");
const submitBtn = document.getElementById("submitBtn");
const correctSelect = document.getElementById("correctOption");
const categorySelect = document.querySelector('select[name="category"]');
const pageTitle = document.getElementById("pageTitle");

const defaultTitle = "Nellai RRB";

/* ---------- Heading Behavior ---------- */
// When user clicks or opens the category dropdown
categorySelect.addEventListener("focus", () => {
  pageTitle.textContent = "Select Your Category";
});

// When category is changed
categorySelect.addEventListener("change", () => {
  const selected = categorySelect.value;
  if (selected) {
    pageTitle.textContent = ` ${selected}`;
  } else {
    pageTitle.textContent = defaultTitle;
  }
});

/* ---------- Correct Option Highlight ---------- */
correctSelect.addEventListener("change", () => {
  correctSelect.style.boxShadow = "0 0 15px #00ffcc";
  setTimeout(() => (correctSelect.style.boxShadow = "inset 0 0 0 1.5px #ddd"), 1000);
});

/* ---------- Submit Form ---------- */
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.textContent = "Saving...";

  const formData = new FormData(form);

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbw-oGFpX9dUkKWt2fOE_-9ltYIjcnvXY1JZcxqBIi4rFn2oJDF9A4aJMt_3wiYdpao/exec",
      { method: "POST", body: formData }
    );

    const resultData = await response.json();

    if (resultData.success) {
      result.textContent = "✅ Question added successfully!";
      result.className = "result success show";
      form.reset();

      // Reset heading to default after save
      setTimeout(() => {
        pageTitle.textContent = defaultTitle;
      }, 500);
    } else {
      throw new Error(resultData.error || "Server error");
    }
  } catch (err) {
    result.textContent = "❌ Error: " + err.message;
    result.className = "result error show";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit Question";

    // Auto-hide result message
    setTimeout(() => {
      result.classList.remove("show");
      result.textContent = "";
    }, 3000);
  }
});
