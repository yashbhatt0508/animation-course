import React, { createContext, useContext, useState, useEffect } from 'react';

const EnrollmentContext = createContext();

export default function EnrollmentProvider({ children }) {
  const [enrollments, setEnrollments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load enrollments from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('creativeindia_enrollments');
    if (stored) {
      try {
        setEnrollments(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load enrollments', e);
      }
    }
    setIsLoading(false);
  }, []);

  // Save enrollments to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('creativeindia_enrollments', JSON.stringify(enrollments));
    }
  }, [enrollments, isLoading]);

  const addEnrollment = (courseId, userName, email) => {
    const enrollment = {
      courseId,
      userName,
      email,
      status: 'completed',
      enrolledAt: new Date().toISOString(),
    };

    setEnrollments((prev) => {
      // Check if already enrolled
      if (prev.some((e) => e.courseId === courseId)) {
        return prev;
      }
      return [...prev, enrollment];
    });
  };

  const isEnrolled = (courseId) => {
    return enrollments.some(
      (e) => e.courseId === courseId && e.status === 'completed'
    );
  };

  const getEnrollments = () => enrollments;

  return (
    <EnrollmentContext.Provider
      value={{
        enrollments,
        isLoading,
        addEnrollment,
        isEnrolled,
        getEnrollments,
      }}
    >
      {children}
    </EnrollmentContext.Provider>
  );
}

export function useEnrollment() {
  const context = useContext(EnrollmentContext);
  if (!context) {
    throw new Error('useEnrollment must be used within EnrollmentProvider');
  }
  return context;
}