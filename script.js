const dayInput = document.querySelector(".dateInput");
const monthInput = document.querySelector(".monthInput");
const yearInput = document.querySelector(".yearInput");

const btn = document.querySelector(".btn");

const yearDisplay = document.querySelector(".displayYears");
const monthDisplay = document.querySelector(".displayMonths");
const dayDisplay = document.querySelector(".displayDays");

const errorFields = document.querySelectorAll(".error");

function showError(index, message) {
  errorFields[index].textContent = message;
  errorFields[index].style.display = "block";
}

function clearErrors() {
  errorFields.forEach((err) => {
    err.textContent = "";
    err.style.display = "none";
  });
}

function isValidDate(d, m, y) {
  const date = new Date(`${y}-${m}-${d}`);
  return (
    date.getFullYear() === parseInt(y) &&
    date.getMonth() === parseInt(m) - 1 &&
    date.getDate() === parseInt(d)
  );
}

btn.addEventListener("click", () => {
  clearErrors();

  const day = dayInput.value.trim();
  const month = monthInput.value.trim();
  const year = yearInput.value.trim();

  let hasError = false;

  if (!day) {
    showError(0, "This field is required");
    hasError = true;
  } else if (day < 1 || day > 31) {
    showError(0, "Must be a valid day");
    hasError = true;
  }

  if (!month) {
    showError(1, "This field is required");
    hasError = true;
  } else if (month < 1 || month > 12) {
    showError(1, "Must be a valid month");
    hasError = true;
  }

  if (!year) {
    showError(2, "This field is required");
    hasError = true;
  } else if (year > new Date().getFullYear()) {
    showError(2, "Must be in the past");
    hasError = true;
  }

  if (hasError) return;

  if (!isValidDate(day, month, year)) {
    showError(0, "Invalid date");
    showError(1, "");
    showError(2, "");
    return;
  }

  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  if (birthDate > today) {
    showError(2, "Date must be in the past");
    return;
  }

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // Display values
  yearDisplay.textContent = years;
  monthDisplay.textContent = months;
  dayDisplay.textContent = days;
});
