
export const COURSE_GROUPS = [
    {
        groupName: "European/Standard Languages",
        courses: [
            "German", "English", "Arabic", "Spanish", "French", "Swedish", 
            "Swahili", "Yoruba", "Hausa", "Igbo", "Portuguese", "Polish", 
            "Italian", "Finnish", "Dutch", "Turkish", "Hindi", "Hebrew", 
            "Greek", "Russian"
        ],
        levels: ["A1", "A2", "B1", "B2", "C1", "C2"]
    },
    {
        groupName: "Japanese",
        courses: ["Japanese"],
        levels: ["N5", "N4", "N3", "N2", "N1"]
    },
    {
        groupName: "Chinese",
        courses: ["Chinese"],
        levels: ["HSK 1", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6"]
    },
    {
        groupName: "Korean",
        courses: ["Korean"],
        levels: ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6"]
    },
    {
        groupName: "Examination Preparatory",
        courses: [
            "GRE", "GMAT", "OET", "CELPIP", "IELTS", "TOEFL", "SAT", 
            "JAMB", "PTE", "SELT"
        ],
        levels: ["Preparatory"] 
    }
];

export const getAllCourses = () => {
    const courses = [];
    COURSE_GROUPS.forEach(group => {
        courses.push(...group.courses);
    });
    return courses.sort();
};

export const getLevelsForCourse = (courseName) => {
    if (!courseName) return [];
    
    // Normalize logic if needed (e.g. case insensitive) can be added here
    // For now assuming exact match or case-insensitive find
    const group = COURSE_GROUPS.find(g => 
        g.courses.some(c => c.toLowerCase() === courseName.toLowerCase())
    );
    
    return group ? group.levels : ["A1", "A2", "B1", "B2", "C1", "C2"]; // Default fallback
};
