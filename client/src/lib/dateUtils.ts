export const formatDate = (dateString: string | Date): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatTime = (timeString: string): string => {
  // Handle both HH:MM and HH:MM:SS formats
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours, 10);
  const minute = parseInt(minutes, 10);
  
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  
  return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
};

export const formatDateTime = (dateString: string | Date, timeString?: string): string => {
  const formattedDate = formatDate(dateString);
  if (timeString) {
    const formattedTime = formatTime(timeString);
    return `${formattedDate} at ${formattedTime}`;
  }
  return formattedDate;
};