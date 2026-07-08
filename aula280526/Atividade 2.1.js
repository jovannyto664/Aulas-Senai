function diferencaDias(date1, date2) {
    const dt1 = new Date(date1);
    const dt2 = new Date(date2);
    let diffMs = Math.abs(dt2 - dt1);
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    return diffDays;
}

console.log(diferencaDias("2026-01-01", "2026-01-15"));



