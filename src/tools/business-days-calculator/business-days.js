document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const bdStart = document.getElementById('bd-start');
    const bdEnd = document.getElementById('bd-end');
    const panelBetween = document.getElementById('panel-between');
    const panelAddSub = document.getElementById('panel-addsub');
    const bdOp = document.getElementById('bd-op');
    const bdDaysCount = document.getElementById('bd-days-count');
    const bdHolidays = document.getElementById('bd-holidays');
    const bdIncludeEnd = document.getElementById('bd-include-end');
    const btnCalc = document.getElementById('btn-calc-bd');

    const outLabel = document.getElementById('out-bd-label');
    const outMain = document.getElementById('out-bd-main');
    const outSub = document.getElementById('out-bd-sub');
    const outCalendar = document.getElementById('out-bd-calendar');
    const outWeekends = document.getElementById('out-bd-weekends');
    const outHolidaysCount = document.getElementById('out-bd-holidays-count');

    const holidayListTitle = document.getElementById('holiday-list-title');
    const holidayList = document.getElementById('holiday-list');
    const holidayListBtn = document.getElementById('bd-holidays-box');

    // Setup toggles
    document.querySelectorAll('#mode-toggle button').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#mode-toggle button').forEach(b => {
                b.classList.remove('active');
                b.classList.add('secondary');
            });
            btn.classList.add('active');
            btn.classList.remove('secondary');

            const mode = btn.dataset.mode;
            if (mode === 'between') {
                panelBetween.style.display = 'block';
                panelAddSub.style.display = 'none';
                outLabel.textContent = 'Resulting Business Days';
                btnCalc.textContent = 'Calculate Working Days';
            } else {
                panelBetween.style.display = 'none';
                panelAddSub.style.display = 'block';
                outLabel.textContent = 'Target Date';
                btnCalc.textContent = 'Calculate New Date';
            }
            calculate();
        });
    });

    // Set default dates
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 30);

    bdStart.value = formatDate(today);
    bdEnd.value = formatDate(futureDate);

    // Helpers
    function formatDate(d) {
        let month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [year, month, day].join('-');
    }

    function parseDate(str) {
        const [y, m, d] = str.split('-').map(Number);
        return new Date(y, m - 1, d);
    }

    function getNthWeekdayOfMonth(n, weekday, month, y) {
        let d = new Date(y, month, 1);
        let count = 0;
        while (d.getMonth() === month) {
            if (d.getDay() === weekday) {
                count++;
                if (count === n) return d;
            }
            d.setDate(d.getDate() + 1);
        }
        return null;
    }

    function getLastWeekdayOfMonth(weekday, month, y) {
        let d = new Date(y, month + 1, 0);
        while (d.getDay() !== weekday) {
            d.setDate(d.getDate() - 1);
        }
        return d;
    }

    function getEaster(y) {
        const f = Math.floor,
            G = y % 19,
            C = f(y / 100),
            H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
            I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11)),
            J = (y + f(y / 4) + I + 2 - C + f(C / 4)) % 7,
            L = I - J,
            month = 3 + f((L + 40) / 44),
            day = L + 28 - 31 * f(month / 4);
        return new Date(y, month - 1, day);
    }

    function getHolidays(year, country) {
        const list = [];
        if (country === 'none') return list;

        if (country === 'us') {
            const addH = (d, name) => {
                if (!d) return;
                const dayOfWeek = d.getDay();
                let observed = new Date(d);
                if (dayOfWeek === 6) { // Saturday -> Friday
                    observed.setDate(d.getDate() - 1);
                    list.push({ dateStr: formatDate(observed), name: name + ' (Observed)' });
                } else if (dayOfWeek === 0) { // Sunday -> Monday
                    observed.setDate(d.getDate() + 1);
                    list.push({ dateStr: formatDate(observed), name: name + ' (Observed)' });
                } else {
                    list.push({ dateStr: formatDate(d), name: name });
                }
            };

            addH(new Date(year, 0, 1), "New Year's Day");
            addH(getNthWeekdayOfMonth(3, 1, 0, year), "Martin Luther King Jr. Day");
            addH(getNthWeekdayOfMonth(3, 1, 1, year), "Presidents' Day");
            addH(getLastWeekdayOfMonth(1, 4, year), "Memorial Day");
            addH(new Date(year, 5, 19), "Juneteenth National Independence Day");
            addH(new Date(year, 6, 4), "Independence Day");
            addH(getNthWeekdayOfMonth(1, 1, 8, year), "Labor Day");
            addH(getNthWeekdayOfMonth(2, 1, 9, year), "Columbus Day");
            addH(new Date(year, 10, 11), "Veterans Day");
            addH(getNthWeekdayOfMonth(4, 4, 10, year), "Thanksgiving Day");
            addH(new Date(year, 11, 25), "Christmas Day");
        }

        if (country === 'uk') {
            let ny = new Date(year, 0, 1);
            if (ny.getDay() === 6) {
                list.push({ dateStr: formatDate(new Date(year, 0, 3)), name: "New Year's Day Bank Holiday" });
            } else if (ny.getDay() === 0) {
                list.push({ dateStr: formatDate(new Date(year, 0, 2)), name: "New Year's Day Bank Holiday" });
            } else {
                list.push({ dateStr: formatDate(ny), name: "New Year's Day" });
            }

            const easter = getEaster(year);
            const gf = new Date(easter);
            gf.setDate(easter.getDate() - 2);
            list.push({ dateStr: formatDate(gf), name: "Good Friday" });

            const em = new Date(easter);
            em.setDate(easter.getDate() + 1);
            list.push({ dateStr: formatDate(em), name: "Easter Monday" });

            list.push({ dateStr: formatDate(getNthWeekdayOfMonth(1, 1, 4, year)), name: "Early May Bank Holiday" });
            list.push({ dateStr: formatDate(getLastWeekdayOfMonth(1, 4, year)), name: "Spring Bank Holiday" });
            list.push({ dateStr: formatDate(getLastWeekdayOfMonth(1, 7, year)), name: "Summer Bank Holiday" });

            let xmas = new Date(year, 11, 25);
            let xmasDay = xmas.getDay();

            if (xmasDay === 5) {
                list.push({ dateStr: formatDate(xmas), name: "Christmas Day" });
                list.push({ dateStr: formatDate(new Date(year, 11, 28)), name: "Boxing Day Bank Holiday" });
            } else if (xmasDay === 6) {
                list.push({ dateStr: formatDate(new Date(year, 11, 27)), name: "Christmas Day Bank Holiday" });
                list.push({ dateStr: formatDate(new Date(year, 11, 28)), name: "Boxing Day Bank Holiday" });
            } else if (xmasDay === 0) {
                list.push({ dateStr: formatDate(new Date(year, 11, 27)), name: "Christmas Day Bank Holiday" });
                list.push({ dateStr: formatDate(new Date(year, 11, 26)), name: "Boxing Day" });
            } else {
                list.push({ dateStr: formatDate(xmas), name: "Christmas Day" });
                list.push({ dateStr: formatDate(new Date(year, 11, 26)), name: "Boxing Day" });
            }
        }

        return list;
    }

    function getHolidaysForRange(startYear, endYear, country) {
        let all = [];
        for (let y = startYear; y <= endYear; y++) {
            all = all.concat(getHolidays(y, country));
        }
        return all;
    }

    function calculate() {
        const mode = document.querySelector('#mode-toggle button.active').dataset.mode;
        const country = bdHolidays.value;
        const startStr = bdStart.value;

        if (!startStr) return;
        const startDate = parseDate(startStr);

        if (mode === 'between') {
            const endStr = bdEnd.value;
            if (!endStr) return;
            const endDate = parseDate(endStr);

            let firstDate = startDate;
            let lastDate = endDate;
            let isReversed = false;

            if (startDate > endDate) {
                firstDate = endDate;
                lastDate = startDate;
                isReversed = true;
            }

            // Generate holidays for years range
            const holidays = getHolidaysForRange(firstDate.getFullYear(), lastDate.getFullYear(), country);
            const holidaySet = new Set(holidays.map(h => h.dateStr));

            let current = new Date(firstDate);
            let businessDays = 0;
            let weekendDays = 0;
            let holidaysCount = 0;
            let calendarDays = 0;
            let hitHolidays = [];

            const includeEnd = bdIncludeEnd.checked;

            while (true) {
                // Determine if we should check the current day
                if (current > lastDate) break;
                if (current.getTime() === lastDate.getTime() && !includeEnd) break;

                calendarDays++;
                const dayOfWeek = current.getDay();
                const formatted = formatDate(current);

                if (dayOfWeek === 0 || dayOfWeek === 6) {
                    weekendDays++;
                } else if (holidaySet.has(formatted)) {
                    holidaysCount++;
                    const match = holidays.find(h => h.dateStr === formatted);
                    hitHolidays.push(`${formatted}: ${match.name}`);
                } else {
                    businessDays++;
                }

                current.setDate(current.getDate() + 1);
            }

            outMain.textContent = isReversed ? `-${businessDays}` : businessDays;
            outSub.textContent = `from ${firstDate.toLocaleDateString(undefined, {dateStyle: 'medium'})} to ${lastDate.toLocaleDateString(undefined, {dateStyle: 'medium'})}`;
            outCalendar.textContent = `${calendarDays} days`;
            outWeekends.textContent = `${weekendDays} days`;
            outHolidaysCount.textContent = `${holidaysCount} days`;

            // Display observed holidays
            if (hitHolidays.length > 0) {
                holidayListBtn.style.display = 'block';
                holidayList.innerHTML = '';
                hitHolidays.forEach(h => {
                    const li = document.createElement('li');
                    li.textContent = h;
                    holidayList.appendChild(li);
                });
            } else {
                holidayListBtn.style.display = 'none';
            }
        } else {
            // Add/Subtract Working Days
            const count = parseInt(bdDaysCount.value) || 0;
            const op = bdOp.value;

            let current = new Date(startDate);
            let daysToProcess = count;
            let calendarDays = 0;
            let weekendDays = 0;
            let holidaysCount = 0;
            let hitHolidays = [];

            const step = op === 'add' ? 1 : -1;

            // Pre-generate holidays for a wide range (e.g. 5 years forward or backward)
            const rangeStart = Math.min(startDate.getFullYear(), startDate.getFullYear() + Math.floor((step * count) / 250) - 1);
            const rangeEnd = Math.max(startDate.getFullYear(), startDate.getFullYear() + Math.floor((step * count) / 250) + 1);
            const holidays = getHolidaysForRange(rangeStart, rangeEnd, country);
            const holidaySet = new Set(holidays.map(h => h.dateStr));

            while (daysToProcess > 0) {
                current.setDate(current.getDate() + step);
                calendarDays++;
                const dayOfWeek = current.getDay();
                const formatted = formatDate(current);

                if (dayOfWeek === 0 || dayOfWeek === 6) {
                    weekendDays++;
                } else if (holidaySet.has(formatted)) {
                    holidaysCount++;
                    const match = holidays.find(h => h.dateStr === formatted);
                    hitHolidays.push(`${formatted}: ${match.name}`);
                } else {
                    daysToProcess--;
                }
            }

            outMain.textContent = current.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            outSub.textContent = `${op === 'add' ? 'Added' : 'Subtracted'} ${count} working days`;
            outCalendar.textContent = `${calendarDays} days`;
            outWeekends.textContent = `${weekendDays} days`;
            outHolidaysCount.textContent = `${holidaysCount} days`;

            // Display observed holidays
            if (hitHolidays.length > 0) {
                holidayListBtn.style.display = 'block';
                holidayList.innerHTML = '';
                hitHolidays.forEach(h => {
                    const li = document.createElement('li');
                    li.textContent = h;
                    holidayList.appendChild(li);
                });
            } else {
                holidayListBtn.style.display = 'none';
            }
        }
    }

    btnCalc.addEventListener('click', calculate);
    calculate();
});
