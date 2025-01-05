function timeAgo(createdAt: string): string {
  const now = new Date();
  const createdDate = new Date(createdAt);

  if (isNaN(createdDate.getTime())) {
    throw new Error("Invalid date format");
  }

  const diffInSeconds = Math.floor(
    (now.getTime() - createdDate.getTime()) / 1000
  );

  const timeIntervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const interval in timeIntervals) {
    const seconds = timeIntervals[interval];
    const count = Math.floor(diffInSeconds / seconds);

    if (count > 0) {
      return count === 1 ? `1 ${interval} ago` : `${count} ${interval}s ago`;
    }
  }

  return "just now";
}
export default timeAgo;
