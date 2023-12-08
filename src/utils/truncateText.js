export function truncateText(text, maxLength) {
    // Split the text into words
    const words = text.split(' ');

    // If the text has fewer than 25 words or is already shorter than the maxLength, return it as is
    if (words.length <= maxLength || text.length <= maxLength) {
        return text;
    }

    // Otherwise, truncate the text to the first 25 words and add "..."
    const truncatedText = words.slice(0, maxLength).join(' ') + '...';
    return truncatedText;
}
  
  
  