import axios from "axios";

const API_BASE_URL = "https://diamond-inventory.onrender.com/api";

export interface EmailExportRequest {
    category: "fancy" | "high" | "low";
    emails: string[];
}

export interface EmailExportResponse {
    success: boolean;
    message: string;
}

class EmailService {
    private api;

    constructor() {
        this.api = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                "Content-Type": "application/json",
            },
            timeout: 30000, // 30 seconds timeout
        });
    }

    /**
     * Send CSV export email to multiple recipients
     * @param data - Email export request data
     * @returns Promise with the response
     */
    async sendCsvExport(
        data: EmailExportRequest
    ): Promise<EmailExportResponse> {
        try {
            const response = await this.api.post<EmailExportResponse>(
                "/diamonds/email-export-csv",
                data
            );

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Handle Axios-specific errors
                if (error.response) {
                    // Server responded with error status
                    const errorMessage =
                        error.response.data?.message ||
                        "Failed to send email report";
                    throw new Error(errorMessage);
                } else if (error.request) {
                    // Request was made but no response received
                    throw new Error(
                        "Network error: Unable to reach the server"
                    );
                } else {
                    // Something else happened
                    throw new Error("Request failed: " + error.message);
                }
            }

            // Handle non-Axios errors
            throw new Error(
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred"
            );
        }
    }

    /**
     * Validate email addresses
     * @param emails - Array of email addresses to validate
     * @returns Object with validation result and invalid emails
     */
    validateEmails(emails: string[]): {
        isValid: boolean;
        invalidEmails: string[];
    } {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const invalidEmails = emails.filter(
            (email) => !emailRegex.test(email.trim())
        );

        return {
            isValid: invalidEmails.length === 0,
            invalidEmails,
        };
    }

    /**
     * Parse comma-separated email string into array
     * @param emailString - Comma-separated email string
     * @returns Array of trimmed email addresses
     */
    parseEmailString(emailString: string): string[] {
        return emailString
            .split(",")
            .map((email) => email.trim())
            .filter((email) => email.length > 0);
    }
}

export const emailService = new EmailService();
