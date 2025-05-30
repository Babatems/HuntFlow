import { ApplicationStat } from './definition'; // Adjust this import based on your actual type location

// Formats date strings into a human-readable local format
export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

// Generates y-axis labels for application charts based on highest application count
export const generateYAxis = (stats: ApplicationStat[]) => {
  const yAxisLabels = [];
  const highestCount = Math.max(...stats.map((month) => month.count));
  const topLabel = Math.ceil(highestCount / 10) * 10;

  for (let i = topLabel; i >= 0; i -= 10) {
    yAxisLabels.push(`${i}`);
  }

  return { yAxisLabels, topLabel };
};

// Generates pagination array based on current page and total pages
export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
