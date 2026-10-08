export function score(item) { return Math.round((item.value + item.urgency + item.riskReduction) / item.effort * 10); }
export function overdue(item, today = new Date().toISOString().slice(0, 10)) { return item.due < today && item.progress < 100; }
export function recommendations(items, today) {
  return items.filter(i => i.progress < 100).flatMap(i => {
    const notes = [];
    if (overdue(i, today)) notes.push({ level: 'Critical', title: `${i.title}: recovery plan needed`, detail: `Ask ${i.lead} to agree a revised date and unblock the next milestone.` });
    if (i.status === 'Blocked') notes.push({ level: 'High', title: `${i.title}: resolve dependency`, detail: `Assign a dependency owner and escalation date with ${i.lead}.` });
    if (!i.tests || !i.security || !i.acceptance) notes.push({ level: 'Medium', title: `${i.title}: shift quality left`, detail: `Before implementation, complete ${[!i.acceptance && 'acceptance criteria', !i.tests && 'test planning', !i.security && 'security review'].filter(Boolean).join(', ')}.` });
    return notes;
  });
}
export function leadMetrics(items, lead, today) {
  const owned = items.filter(i => i.lead === lead);
  return { total: owned.length, complete: owned.filter(i => i.progress === 100).length, blocked: owned.filter(i => i.status === 'Blocked').length, overdue: owned.filter(i => overdue(i, today)).length, readiness: owned.length ? Math.round(owned.reduce((n, i) => n + Number(i.tests) + Number(i.security) + Number(i.acceptance), 0) / (owned.length * 3) * 100) : 0 };
}
