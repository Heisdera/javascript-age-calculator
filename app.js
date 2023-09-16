const input = document.querySelector(".birthday-input");
const btn = document.querySelector(".btn");
const result = document.querySelector(".result-container");

const getAge = () => {
  const todaysDate = new Date();
  const inputDate = new Date(input.value);

  const birthDateDetails = {
    year: inputDate.getFullYear(),
    month: inputDate.getMonth() + 1,
    date: inputDate.getDate(),
  };

  const currentYear = todaysDate.getFullYear();
  const currentMonth = todaysDate.getMonth() + 1;
  const currentDate = todaysDate.getDate();

  const isFutureDate = () => {
    const {
      year: birthYear,
      month: birthMonth,
      date: birthDate,
    } = birthDateDetails;

    if (
      birthYear > currentYear ||
      (birthYear === currentYear &&
        (birthMonth > currentMonth ||
          (birthMonth === currentMonth && birthDate > currentDate)))
    )
      return true;
  };

  if (isFutureDate()) {
    alert("Not Yet Born");
    return;
  }

  const { years, months, days } = calculateAge(
    birthDateDetails,
    currentYear,
    currentMonth,
    currentDate
  );

  if (input.value === "") {
    alert("Please enter your birth date");
  } else {
    displayAge(years, months, days);
  }
};

const calculateAge = (
  birthDateDetails,
  currentYear,
  currentMonth,
  currentDate
) => {
  const {
    year: birthYear,
    month: birthMonth,
    date: birthDate,
  } = birthDateDetails;

  let years = currentYear - birthYear; // years difference
  let months;
  let days;

  // months difference
  if (currentMonth >= birthMonth) months = currentMonth - birthMonth;
  else {
    years--;
    months = 12 + currentMonth - birthMonth;
  }

  // days difference
  if (currentDate >= birthDate) days = currentDate - birthDate;
  else {
    months--;
    const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    days = currentDate - birthDate + daysInMonth(lastMonth, currentYear);
    days;

    if (months < 0) {
      months = 11;
      years--;
    }
  }

  return { years, months, days };
};

const daysInMonth = (month, year) => {
  const date = new Date(year, month, 0);
  const daysInMonth = date.getDate();
  return daysInMonth;
};

const displayAge = (years, months, days) => {
  result.innerHTML = `
    <div>
      <span class="years">${years}</span>
      <p>${years > 1 ? "years" : "year"}</p>
    </div>
    <div>
      <span class="months">${months}</span>
      <p>${months > 1 ? "months" : "month"}</p>
    </div>
    <div>
      <span class="days">${days}</span>
      <p>${days > 1 ? "days" : "day"} old</p>
    </div>
  `;
};

btn.addEventListener("click", getAge);
