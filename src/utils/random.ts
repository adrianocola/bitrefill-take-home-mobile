import dayjs from 'dayjs';

export function randomRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomItem<T>(items: T[]) {
  return items[randomInteger(0, items.length - 1)];
}

export function getRandomPastDate(daysAgo: number) {
  const now = dayjs();
  const pastDate = now.subtract(daysAgo, 'day');
  const randomTimestamp = Math.random() * (now.valueOf() - pastDate.valueOf()) + pastDate.valueOf();

  return dayjs(randomTimestamp).toDate();
}
