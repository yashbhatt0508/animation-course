import { useEnrollment } from '../context/EnrollmentContext';

/**
 * Custom hook to check if a user is enrolled in a specific course
 * @param {string} courseId - The course ID to check enrollment for
 * @returns {boolean} - Whether the user is enrolled in the course
 */
export function useIsEnrolled(courseId) {
  const { isEnrolled, isLoading } = useEnrollment();

  // Return false while loading to prevent premature redirects
  if (isLoading) {
    return false;
  }

  return isEnrolled(courseId);
}