interface FormatDateOptions {
    year: "numeric";
    month: "long";
    day: "numeric";
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    } as FormatDateOptions);
}