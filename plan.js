function date(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error('Dates must use YYYY-MM-DD');
  const parsed = new Date(value+'T00:00:00Z');
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0,10)!==value) throw new Error('Invalid calendar date');
  return value;
}
export function plan(tasks, today) {
  date(today);
  if (!Array.isArray(tasks)) throw new Error('Input must be a JSON array');
  const ids=new Set();
  const validated=tasks.map((task,i)=>{
    if (!task || typeof task.id!=='string' || !task.id.trim() || ids.has(task.id) || typeof task.title!=='string' || !task.title.trim() || !['todo','doing','done'].includes(task.status) || !Number.isInteger(task.priority) || task.priority<1 || task.priority>3) throw new Error(`Invalid or duplicate task at index ${i}`);
    date(task.due); ids.add(task.id); return {...task};
  });
  const open=validated.filter(t=>t.status!=='done').sort((a,b)=>a.due.localeCompare(b.due)||a.priority-b.priority||a.id.localeCompare(b.id));
  return {asOf:today,total:tasks.length,completed:validated.filter(t=>t.status==='done').length,overdue:open.filter(t=>t.due<today),dueToday:open.filter(t=>t.due===today),upcoming:open.filter(t=>t.due>today)};
}
