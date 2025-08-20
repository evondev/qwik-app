export function generateMockTasks(count: number) {
  const tasks = [];
  for (let i = 0; i < count; i++) {
    tasks.push({
      id: i,
      title: `Task ${i}`,
      completed: Math.random() > 0.5,
    });
  }
  return tasks;
}
