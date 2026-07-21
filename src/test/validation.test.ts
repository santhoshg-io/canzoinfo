import { describe, it, expect } from "vitest";
import { validatePayload, escapeHtml, sanitizeUrlServer, verifyCsrf, rateLimitIp, clearRateLimitCache } from "../../api/send-email";

describe("Server-Side Validation & Sanitization", () => {
  describe("validatePayload", () => {
    it("should pass for a valid payload", () => {
      const payload = {
        Name: "Santhosh G",
        email: "santhosh@example.com",
        Phone: "9876543210",
        College: "Anna University",
        Message: "Hello there!",
      };
      const result = validatePayload(payload);
      expect(result.isValid).toBe(true);
    });

    it("should fail for an invalid email", () => {
      const payload = {
        Name: "Santhosh G",
        email: "santhosh-invalid-email",
        Phone: "9876543210",
      };
      const result = validatePayload(payload);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain("valid email address");
    });

    it("should fail for an invalid phone number", () => {
      const payload = {
        Name: "Santhosh G",
        email: "santhosh@example.com",
        Phone: "123",
      };
      const result = validatePayload(payload);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain("valid phone number");
    });

    it("should fail for a name too short", () => {
      const payload = {
        Name: "A",
        email: "santhosh@example.com",
        Phone: "9876543210",
      };
      const result = validatePayload(payload);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain("Name must be between 2 and 100 characters");
    });
  });

  describe("escapeHtml", () => {
    it("should escape HTML tags to prevent XSS", () => {
      const input = '<script>alert("hello")</script>';
      const output = escapeHtml(input);
      expect(output).toBe("&lt;script&gt;alert(&quot;hello&quot;)&lt;&#x2F;script&gt;");
    });
  });

  describe("sanitizeUrlServer", () => {
    it("should allow HTTP/HTTPS URLs", () => {
      expect(sanitizeUrlServer("https://example.com/resume.pdf")).toBe("https://example.com/resume.pdf");
      expect(sanitizeUrlServer("http://example.com")).toBe("http://example.com/");
    });

    it("should reject dangerous URI schemes", () => {
      expect(sanitizeUrlServer("javascript:alert(1)")).toBe("");
      expect(sanitizeUrlServer("data:text/html,test")).toBe("");
    });
  });

  describe("verifyCsrf", () => {
    it("should allow requests with no origin/referer", () => {
      expect(verifyCsrf({})).toBe(true);
    });

    it("should allow requests from local origins", () => {
      expect(verifyCsrf({ origin: "http://localhost:8080" })).toBe(true);
      expect(verifyCsrf({ referer: "http://127.0.0.1:3000/apply" })).toBe(true);
    });

    it("should allow requests from canzo.in and vercel.app domains", () => {
      expect(verifyCsrf({ origin: "https://canzo.in" })).toBe(true);
      expect(verifyCsrf({ referer: "https://some-deploy.vercel.app/" })).toBe(true);
    });

    it("should deny requests from external untrusted origins", () => {
      expect(verifyCsrf({ origin: "https://malicious-site.com" })).toBe(false);
      expect(verifyCsrf({ referer: "https://evil-hacker.com/attack" })).toBe(false);
    });
  });

  describe("rateLimitIp", () => {
    it("should allow standard number of requests and block after threshold", () => {
      clearRateLimitCache();
      const ip = "1.2.3.4";
      
      expect(rateLimitIp(ip, 3, 60000)).toBe(true);
      expect(rateLimitIp(ip, 3, 60000)).toBe(true);
      expect(rateLimitIp(ip, 3, 60000)).toBe(true);
      expect(rateLimitIp(ip, 3, 60000)).toBe(false);
    });
  });
});
