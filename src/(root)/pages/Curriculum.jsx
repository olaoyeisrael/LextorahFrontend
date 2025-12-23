import React, { useState, useEffect } from 'react';
import { isAdmin, getToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { Plus, BookOpen, Loader2, Trash2 } from 'lucide-react';
import { COURSE_GROUPS, getLevelsForCourse } from '../../utils/courseData';

const Curriculum = () => {
    const navigate = useNavigate();
    const token = getToken();

    // Protection
    useEffect(() => {
        if (!isAdmin()) {
            navigate('/');
        }
    }, [navigate]);

    // State
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);
    const [filters, setFilters] = useState({ course: 'German', level: 'A1' });
    
    const [form, setForm] = useState({
        course: 'German',
        level: 'A1',
    });
    
    // Dynamic Topics List
    const [topicList, setTopicList] = useState(['']);



    const [message, setMessage] = useState('');

    // Fetch Curriculum
    const fetchCurriculum = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/curriculum?course=${filters.course}&level=${filters.level}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.curriculum) {
                setItems(data.curriculum);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCurriculum();
    }, [filters]); 

    const handleChange = (e) => {
        if (e.target.name === 'course') {
            const levels = getLevelsForCourse(e.target.value);
            setForm({ ...form, course: e.target.value, level: levels[0] || '' });
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    const handleTopicChange = (index, value) => {
        const list = [...topicList];
        list[index] = value;
        setTopicList(list);
    };

    const addTopicField = () => {
        setTopicList([...topicList, '']);
    };

    const removeTopicField = (index) => {
        const list = [...topicList];
        list.splice(index, 1);
        setTopicList(list);
    };


    const handleFilterChange = (e) => {
        if (e.target.name === 'course') {
            const levels = getLevelsForCourse(e.target.value);
            setFilters({ ...filters, course: e.target.value, level: levels[0] || '' });
        } else {
            setFilters({ ...filters, [e.target.name]: e.target.value });
        }
    };

    // Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        // Prepare batch
        const batch = topicList.map((t, idx) => ({
            course: form.course,
            level: form.level,
            // Week is deprecated, we could send None or derived
            week: idx + 1, // sending pseudo-week/module number if needed
            topic: t,
            description: null
        })).filter(t => t.topic.trim() !== ""); // Filter empty

        if (batch.length === 0) {
            setMessage("Please add at least one topic.");
            return;
        }
        console.log("Batch: ",batch);

        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/curriculum/batch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(batch)
                
            });

            if (res.ok) {
                const data = await res.json();
                setMessage(data.msg || 'Topics added successfully!');
                setTopicList(['']); // Reset list
                fetchCurriculum(); // Refresh
            } else {

                setMessage('Failed to add topics.');
            }
        } catch (err) {
            console.error(err);
            setMessage('Error connecting to server.');
        }
    };


    return (
        <section className="max-w-6xl mx-auto p-4 md:p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="text-green-600" />
                    Curriculum Management
                </h1>
                <p className="text-slate-500">Define the learning path for each course.</p>
            </header>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-fit">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">Add New Topic</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Course</label>
                            <select 
                                name="course" value={form.course} onChange={handleChange} 
                                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-green-500 focus:border-green-500" 
                            >
                                {COURSE_GROUPS.map((group, idx) => (
                                    <optgroup key={idx} label={group.groupName}>
                                        {group.courses.map(course => (
                                            <option key={course} value={course}>{course}</option>
                                        ))}
                                    </optgroup>
                                ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Level</label>
                                <select
                                    name="level" value={form.level} onChange={handleChange}
                                    className="w-full p-2 border border-slate-200 rounded-lg focus:ring-green-500 focus:border-green-500"
                                >
                                    {getLevelsForCourse(form.course).map(level => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Modules & Topics</label>
                            <div className="space-y-3">
                                {topicList.map((t, idx) => (
                                    <div key={idx} className="flex gap-2 items-center">
                                        <div className="w-24 text-sm font-bold text-slate-500 flex-shrink-0">
                                            Module {idx + 1}
                                        </div>
                                        <div className="flex-1">
                                            <input 
                                                type="text" 
                                                placeholder="Topic Name" 
                                                value={t} 
                                                onChange={(e) => handleTopicChange(idx, e.target.value)}
                                                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-green-500 focus:border-green-500 text-sm"
                                                required
                                            />
                                        </div>
                                        {topicList.length > 1 && (
                                            <button 
                                                type="button" 
                                                onClick={() => removeTopicField(idx)}
                                                className="text-slate-400 hover:text-red-500"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button 
                                type="button" 
                                onClick={addTopicField}
                                className="mt-3 text-sm text-green-600 font-medium hover:text-green-700 flex items-center gap-1"
                            >
                                <Plus size={16} /> Add Next Module
                            </button>
                            <p className="text-xs text-slate-400 mt-2">Topic names must exactly match material uploads.</p>
                        </div>



                        {message && (
                            <div className={`p-3 rounded-lg text-sm ${message.includes('success') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                {message}
                            </div>
                        )}

                        <button 
                            type="submit" 
                            className="w-full bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                        >
                            <BookOpen size={20} /> Save Curriculum
                        </button>

                    </form>
                </div>

                {/* List Section */}
                <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 min-h-[500px]">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-slate-800">Existing Curriculum</h2>
                            <div className="flex gap-2">
                                <select 
                                    name="course" value={filters.course} onChange={handleFilterChange} 
                                    className="p-2 border border-slate-200 rounded-lg text-sm"
                                >
                                    {COURSE_GROUPS.map((group, idx) => (
                                        <optgroup key={idx} label={group.groupName}>
                                            {group.courses.map(course => (
                                                <option key={course} value={course}>{course}</option>
                                            ))}
                                        </optgroup>
                                    ))}
                                </select>
                                <select 
                                    name="level" value={filters.level} onChange={handleFilterChange}
                                    className="p-2 border border-slate-200 rounded-lg text-sm"
                                >
                                    {getLevelsForCourse(filters.course).map(level => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex justify-center items-center h-40">
                                <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
                            </div>
                        ) : items.length === 0 ? (
                            <div className="text-center text-slate-500 py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                No topics found for this course/level. Start adding some!
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {items.map((item) => (
                                    <div key={item.id} className="bg-white border border-slate-100 p-4 rounded-xl flex items-center justify-between hover:shadow-md transition-shadow group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-10 bg-green-100 text-green-700 rounded-lg flex items-center justify-center font-bold text-sm">
                                                Mod {item.index != null ? item.index + 1 : "?"}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-800">{item.topic}</h3>
                                            </div>
                                        </div>

                                        {/* <button className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Trash2 size={18} />
                                        </button> */}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Curriculum;
