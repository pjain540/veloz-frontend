/**
 * Generates the next order number based on the last one.
 * Sequence: #00001, #00002, etc.
 * 
 * @param lastOrderNo - The latest order number from the database (e.g., "#00005")
 * @returns The next order number (e.g., "#00006")
 */
export const generateNextOrderNo = (lastOrderNo: string | null): string => {
    if (!lastOrderNo) {
        return "#00001";
    }

    // Remove the '#' and parse the number
    const lastNumber = parseInt(lastOrderNo.replace("#", ""), 10);
    const nextNumber = lastNumber + 1;

    // Pad with zeros to 5 digits
    return `#${nextNumber.toString().padStart(5, "0")}`;
};
