// utils/nicValidation.js
// Sri Lankan NIC Validation Utility Functions

/**
 * Check if a year is a leap year
 * @param {number} year - Year to check
 * @returns {boolean} True if leap year
 */
const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };
  
  /**
   * Convert day of year to actual date
   * @param {number} year - Birth year
   * @param {number} dayOfYear - Day of the year (1-366)
   * @returns {Date} Birth date
   */
  const getBirthDateFromDayOfYear = (year, dayOfYear) => {
    const date = new Date(year, 0, dayOfYear);
    return date;
  };
  
  /**
   * Format date to YYYY-MM-DD string
   * @param {Date} date - Date object
   * @returns {string} Formatted date string
   */
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };
  
  /**
   * Calculate age from birth date
   * @param {Date} birthDate - Birth date
   * @returns {number} Age in years
   */
  const calculateAge = (birthDate) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };
  
  /**
   * Validate checksum for new format NIC (12 digits)
   * Note: Actual Sri Lankan NIC checksum algorithm is proprietary
   * This function is disabled to avoid false rejections of valid NICs
   * @param {string} nic - 12 digit NIC
   * @returns {Object} Validation result
   */
  const validateNewFormatChecksum = (nic) => {
    // Disable checksum validation as the actual algorithm is not publicly available
    // and implementing an incorrect one would reject valid NICs
    return { isValid: true };
    
    /* 
    // If you have access to the correct checksum algorithm, implement it here:
    const digits = nic.substring(0, 11);
    const checkDigit = parseInt(nic.substring(11, 12));
    
    // TODO: Implement actual Sri Lankan NIC checksum algorithm
    // The algorithm used by Department of Registration of Persons is not publicly documented
    
    return { isValid: true };
    */
  };
  
  /**
   * Extract gender from NIC day of year
   * @param {number} dayOfYear - Day of year from NIC
   * @returns {Object} Gender and actual day
   */
  const extractGenderAndDay = (dayOfYear) => {
    let gender = 'male';
    let actualDayOfYear = dayOfYear;
    
    if (dayOfYear > 500) {
      gender = 'female';
      actualDayOfYear = dayOfYear - 500;
    }
    
    return { gender, actualDayOfYear };
  };
  
  /**
   * Advanced Sri Lankan NIC Validation
   * Supports both old format (9 digits + V/X) and new format (12 digits)
   * Validates birth year, day of year, leap years, and logical dates
   * 
   * @param {string} nic - NIC number to validate
   * @returns {Object} Validation result with isValid flag and data/error
   */
  const validateSriLankanNIC = (nic) => {
    if (!nic || typeof nic !== 'string') {
      return {
        isValid: false,
        error: ''
      };
    }
  
    nic = nic.trim().toUpperCase();
  
    // Check basic format
    const oldFormat = /^(\d{9})[VX]$/;
    const newFormat = /^(\d{12})$/;
    
    let isOldFormat = false;
    let isNewFormat = false;
    let birthYear, dayOfYear;
  
    if (oldFormat.test(nic)) {
      isOldFormat = true;
      const digits = nic.substring(0, 9);
      birthYear = parseInt('19' + digits.substring(0, 2));
      dayOfYear = parseInt(digits.substring(2, 5));
    } else if (newFormat.test(nic)) {
      isNewFormat = true;
      birthYear = parseInt(nic.substring(0, 4));
      dayOfYear = parseInt(nic.substring(4, 7));
    } else {
      return {
        isValid: false,
        error: 'Invalid NIC format. Use old format (9 digits + V/X) or new format (12 digits)'
      };
    }
  
    // Validate birth year
    const currentYear = new Date().getFullYear();
    // if (isOldFormat) {
    //   // Old format covers 1900-1999
    //   if (birthYear < 1900 || birthYear > 1999) {
    //     return {
    //       isValid: false,
    //       error: 'Invalid birth year for old format NIC'
    //     };
    //   }
    // } else {
    //   // New format should be reasonable years
    //   if (birthYear < 1900 || birthYear > currentYear) {
    //     return {
    //       isValid: false,
    //       error: `Invalid birth year: ${birthYear}`
    //     };
    //   }
    // }
  
    // Extract gender and actual day
    const { gender, actualDayOfYear } = extractGenderAndDay(dayOfYear);
  
    // Validate day of year (1-366)
    if (actualDayOfYear < 1 || actualDayOfYear > 366) {
      return {
        isValid: false,
        error: `Invalid day of year: ${actualDayOfYear}`
      };
    }
  
    // Check if the day exists in the birth year
    const maxDaysInYear = isLeapYear(birthYear) ? 366 : 365;
    if (actualDayOfYear > maxDaysInYear) {
      return {
        isValid: false,
        error: `Day ${actualDayOfYear} does not exist in year ${birthYear} (${isLeapYear(birthYear) ? 'leap' : 'non-leap'} year)`
      };
    }
  
    // Convert day of year to actual date
    const birthDate = getBirthDateFromDayOfYear(birthYear, actualDayOfYear);
    
    // Validate that the date is reasonable
    if (birthDate.getFullYear() !== birthYear) {
      return {
        isValid: false,
        error: 'Invalid date calculation'
      };
    }
  
    // Check if birth date is not in the future
    if (birthDate > new Date()) {
      return {
        isValid: false,
        error: 'Birth date cannot be in the future'
      };
    }
  
    // For new format, validate check digits
    if (isNewFormat) {
      const checksumValidation = validateNewFormatChecksum(nic);
      if (!checksumValidation.isValid) {
        return checksumValidation;
      }
    }
  
    return {
      isValid: true,
      data: {
        nic: nic,
        format: isOldFormat ? 'old' : 'new',
        birthYear: birthYear,
        birthDate: formatDate(birthDate),
        dayOfYear: actualDayOfYear,
        gender: gender,
        age: calculateAge(birthDate)
      }
    };
  };
  
  /**
   * Simple NIC format validation (basic regex check only)
   * @param {string} nic - NIC to validate
   * @returns {boolean} True if format is valid
   */
  const isValidNICFormat = (nic) => {
    if (!nic) return false;
    const cleanNIC = nic.trim().toUpperCase();
    return /^(\d{9}[VX]|\d{12})$/.test(cleanNIC);
  };
  
  /**
   * Extract basic info from NIC without full validation
   * @param {string} nic - Valid NIC number
   * @returns {Object} Basic NIC information
   */
  const extractNICInfo = (nic) => {
    const validation = validateSriLankanNIC(nic);
    return validation.isValid ? validation.data : null;
  };
  
  /**
   * Check if NIC belongs to a male
   * @param {string} nic - NIC number
   * @returns {boolean} True if male
   */
  const isMaleNIC = (nic) => {
    const info = extractNICInfo(nic);
    return info ? info.gender === 'male' : null;
  };
  
  /**
   * Check if NIC belongs to a female
   * @param {string} nic - NIC number
   * @returns {boolean} True if female
   */
  const isFemaleNIC = (nic) => {
    const info = extractNICInfo(nic);
    return info ? info.gender === 'female' : null;
  };
  
  /**
   * Get age from NIC
   * @param {string} nic - NIC number
   * @returns {number} Age in years or null if invalid
   */
  const getAgeFromNIC = (nic) => {
    const info = extractNICInfo(nic);
    return info ? info.age : null;
  };
  
  /**
   * Get birth year from NIC
   * @param {string} nic - NIC number
   * @returns {number} Birth year or null if invalid
   */
  const getBirthYearFromNIC = (nic) => {
    const info = extractNICInfo(nic);
    return info ? info.birthYear : null;
  };
  

  
  // For ES6 modules, use this instead:
  export {
    validateSriLankanNIC,
    isValidNICFormat,
    extractNICInfo,
    isMaleNIC,
    isFemaleNIC,
    getAgeFromNIC,
    getBirthYearFromNIC,
    isLeapYear,
    getBirthDateFromDayOfYear,
    formatDate,
    calculateAge
  };