import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from './api';

// --- CURRICULUM QUERIES ---
export const useCurriculumQuery = (course, level, courseCode) => useQuery({
    queryKey: ['curriculum', { course, level, courseCode }],
    queryFn: async () => {
        let url = '/curriculum';
        if (courseCode) url += `?course_code=${encodeURIComponent(courseCode)}`;
        else {
            const params = [];
            if (course) params.push(`course=${encodeURIComponent(course)}`);
            if (level) params.push(`level=${encodeURIComponent(level)}`);
            if (params.length > 0) url += `?${params.join('&')}`;
        }
        const res = await apiClient(url);
        if (!res.ok) throw new Error('Fetch failed');
        const data = await res.json();
        return data.curriculum || [];
    },
    staleTime: 300000, // 5 minutes cache
});

export const useCoursesQuery = () => useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
        const res = await apiClient('/api/courses');
        if (!res.ok) throw new Error('Fetch failed');
        return await res.json();
    },
    staleTime: 300000,
});

export const useSprintTopicsQuery = (sprintId) => useQuery({
    queryKey: ['sprintTopics', sprintId],
    queryFn: async () => {
        if (!sprintId) return null;
        const res = await apiClient(`/curriculum/sprint/${sprintId}`);
        if (!res.ok) throw new Error('Fetch failed');
        return await res.json();
    },
    enabled: !!sprintId,
    staleTime: 300000,
});

// --- TRANSCRIPTS & HISTORY ---
export const useHistoryQuery = (userId) => useQuery({
    queryKey: ['history', userId],
    queryFn: async () => {
        if (!userId) return [];
        const res = await apiClient(`/history/${userId}`);
        if (!res.ok) throw new Error('Fetch failed');
        const data = await res.json();
        return data.History || [];
    },
    enabled: !!userId,
    staleTime: 300000,
});

export const useTranscriptsQuery = () => useQuery({
    queryKey: ['transcripts'],
    queryFn: async () => {
        const res = await apiClient('/transcripts');
        if (!res.ok) throw new Error('Fetch failed');
        const data = await res.json();
        return data.transcripts || [];
    },
    staleTime: 300000,
});

// --- USER PROGRESS ---
export const useUserProgressQuery = (courseCode) => useQuery({
    queryKey: ['userProgress', courseCode],
    queryFn: async () => {
        if (!courseCode) return null;
        const res = await apiClient(`/progress?course_code=${encodeURIComponent(courseCode)}`);
        if (!res.ok) throw new Error('Fetch failed');
        return await res.json();
    },
    enabled: !!courseCode,
    staleTime: 300000,
});

// --- MUTATIONS ---
export const useSubmitQuizResultMutation = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (payload) => {
            const res = await apiClient('/submit_quiz_result', {
                method: 'POST',
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error('Post failed');
            return await res.json();
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['history'] });
            qc.invalidateQueries({ queryKey: ['userProgress'] });
        },
    });
};

export const useSubmitAssignmentMutation = (assignmentId) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (formData) => {
            const res = await apiClient(`/assignments/${assignmentId}/submit`, {
                method: 'POST',
                body: formData,
            });
            if (!res.ok) throw new Error('Post failed');
            return await res.json();
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['assignments'] });
        },
    });
};

export const useGradeSubmissionMutation = (submissionId, assignmentId) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (payload) => {
            const res = await apiClient(`/api/submissions/${submissionId}/grade`, {
                method: 'POST',
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error('Post failed');
            return await res.json();
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['submissions', assignmentId] });
            qc.invalidateQueries({ queryKey: ['assignments'] });
        },
    });
};

export const useAddCurriculumBatchMutation = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (payload) => {
            const res = await apiClient('/curriculum/batch', {
                method: 'POST',
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error('Post failed');
            return await res.json();
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['curriculum'] });
        },
    });
};

export const useAddCurriculumMutation = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (payload) => {
            const res = await apiClient('/curriculum', {
                method: 'POST',
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error('Post failed');
            return await res.json();
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['curriculum'] });
        },
    });
};

export const useUpdateCurriculumMutation = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, payload }) => {
            const res = await apiClient(`/curriculum/${id}`, {
                method: 'PUT',
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error('Put failed');
            return await res.json();
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['curriculum'] });
        },
    });
};

export const useDeleteCurriculumMutation = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const res = await apiClient(`/curriculum/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Delete failed');
            return await res.json();
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['curriculum'] });
        },
    });
};

export const useDetailedCoursesQuery = () => useQuery({
    queryKey: ['detailedCourses'],
    queryFn: async () => {
        const res = await apiClient('/api/courses-detailed');
        if (!res.ok) throw new Error('Fetch failed');
        return await res.json();
    },
    staleTime: 300000,
});

export const useDeleteCourseMutation = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (courseCode) => {
            const res = await apiClient(`/api/courses/${courseCode}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Delete failed');
            return await res.json();
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['detailedCourses'] });
            qc.invalidateQueries({ queryKey: ['courses'] });
        },
    });
};

// --- TUTOR DASHBOARD QUERIES ---
export const useTutorMetricsQuery = (isTutorOrAdmin) => useQuery({
    queryKey: ['tutorMetrics'],
    queryFn: async () => {
        const res = await apiClient('/api/tutor/metrics');
        console.log('Tutor Metrics Response:', res);
        if (!res.ok) throw new Error('Failed to fetch tutor metrics');
        return await res.json();
    },
    enabled: !!isTutorOrAdmin,
    refetchInterval: 5000, // Poll every 5 seconds for real-time reactivity
});

export const useTutorSprintsQuery = (isTutorOrAdmin) => useQuery({
    queryKey: ['tutorSprints'],
    queryFn: async () => {
        const res = await apiClient('/api/user/sprints');
        if (!res.ok) throw new Error('Failed to fetch user sprints');
        return await res.json();
    },
    enabled: !!isTutorOrAdmin,
    refetchInterval: 5000, // Poll every 5 seconds
});

// --- NOTIFICATION QUERIES & MUTATIONS ---
export const useNotificationsQuery = () => useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
        const res = await apiClient('/notifications');
        if (!res.ok) throw new Error('Failed to fetch notifications');
        return await res.json();
    },
    refetchInterval: 5000, // Poll every 5 seconds
});

export const useMarkNotificationsReadMutation = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const res = await apiClient('/api/notifications/read', {
                method: 'POST',
            });
            if (!res.ok) throw new Error('Failed to mark notifications as read');
            return await res.json();
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['notifications'] });
        },
    });
};

export const useStudentPerformanceStatsQuery = (enabled) => useQuery({
    queryKey: ['studentPerformanceStats'],
    queryFn: async () => {
        const res = await apiClient('/api/student/performance-stats');
        if (!res.ok) throw new Error('Failed to fetch student performance stats');
        return await res.json();
    },
    enabled: !!enabled,
});
