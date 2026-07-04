import { useState } from "react";

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

interface ValidationRules {
  [key: string]: ValidationRule;
}

export const useFormValidation = (rules: ValidationRules) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: any): string | null => {
    const rule = rules[name];
    if (!rule) return null;

    if (rule.required && (!value || value.toString().trim() === "")) {
      return "Field ini wajib diisi";
    }

    if (rule.minLength && value && value.toString().length < rule.minLength) {
      return `Minimal ${rule.minLength} karakter`;
    }

    if (rule.maxLength && value && value.toString().length > rule.maxLength) {
      return `Maksimal ${rule.maxLength} karakter`;
    }

    if (rule.pattern && value && !rule.pattern.test(value.toString())) {
      return "Format tidak valid";
    }

    if (rule.custom) {
      return rule.custom(value);
    }

    return null;
  };

  const validateForm = (data: Record<string, any>): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    Object.keys(rules).forEach((fieldName) => {
      const error = validateField(fieldName, data[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const clearErrors = () => {
    setErrors({});
  };

  const clearFieldError = (fieldName: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  };

  return {
    errors,
    validateField,
    validateForm,
    clearErrors,
    clearFieldError,
    setErrors,
  };
};
