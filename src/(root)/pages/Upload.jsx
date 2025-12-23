import React, { useRef, useState, useEffect } from 'react'
import { CloudUpload, Loader, FileText, X } from 'lucide-react'
import { isAdmin, getToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { COURSE_GROUPS, getLevelsForCourse } from '../../utils/courseData';


const Upload = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdmin()) {
            navigate('/');
        }
    }, [navigate]);

    const [form, setForm] = useState({
        course_title: '',
        topic: '',
        skill: '',
        level: '',
        file: null
    })

    const fileInputRef = useRef(null)
    const [mes, setMes] = useState('')
    const [loading, setLoading] = useState(false)
    
    // When course changes, reset level
    const handleCourseChange = (e) => {
        setForm({
            ...form,
            course_title: e.target.value,
            level: '' // Reset level when course changes
        });
    }

    const handleChange = (e) => {
        if (e.target.name === "file") {
            setForm({
                ...form,
                file: e.target.files[0]
            });
        } else {
            setForm({
                ...form,
                [e.target.name]: e.target.value
            });
        }
    };

    const clearFile = (e) => {
        e.stopPropagation();
        setForm({ ...form, file: null });
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        if (!form.file || !form.course_title || !form.level || !form.topic) {
             setMes("Please fill in all fields.");
             return;
        }

        setLoading(true)
        const formData = new FormData()
        formData.append("course_title", form.course_title.toLowerCase());
        formData.append("topic", form.topic);
        formData.append("skill", form.skill);
        formData.append("level", form.level.toLowerCase());
        formData.append("file", form.file);

        console.log("formdata: ", formData)
    
        const token = getToken();
        
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/upload`,{
                method: "POST",
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const response = await res.json()
            console.log("Response: ",response)
            setMes(response.msg || "Uploaded successfully!")
            
            // Success cleanup
            if (res.ok) {
                setForm({
                    course_title: "",
                    topic: "",
                    skill: "",
                    level: "",
                    file: null 
                })
                if (fileInputRef.current) {
                    fileInputRef.current.value = ""
                }
            }
        } catch (err) {
            console.error(err);
            setMes("Upload failed. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const handleFileClick = () => {
        fileInputRef.current.click()
    }


  return (
    <section className='max-w-3xl mx-auto p-4 md:p-8'>
        <div className='bg-white rounded-3xl shadow-xl border border-green-50 p-8 md:p-12'>

       
        <h1 className='font-bold font-MadaBold  text-3xl text-[#059669] mt-3'>Upload Materials</h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-6 '>
            <div className='flex gap-2 flex-col '>
                <label htmlFor="" className='text-lg font-medium text-slate-700'>Course</label>
                <select 
                    name="course_title" 
                    className='border border-slate-300 rounded-xl p-3 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all w-full bg-white' 
                    value={form.course_title} 
                    onChange={handleCourseChange}
                >
                    <option value="">Select Course</option>
                    {COURSE_GROUPS.map((group, idx) => (
                        <optgroup key={idx} label={group.groupName}>
                            {group.courses.map(course => (
                                <option key={course} value={course}>{course}</option>
                            ))}
                        </optgroup>
                    ))}
                </select>
            </div>

            <div  className='flex gap-2 flex-col '>
                <label htmlFor="" className='text-lg font-medium text-slate-700'>Topic/Module</label>
                <input 
                    type="text" 
                    className='border border-slate-300 rounded-xl p-3 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all w-full' 
                    name='topic' 
                    value={form.topic} 
                    onChange={handleChange}
                    placeholder="e.g. Introduction to Verbs"
                />
            </div>

            <div  className='flex gap-2 flex-col '>
                <label htmlFor="" className='text-lg font-medium text-slate-700'>Skill</label>
                <input 
                    type="text" 
                    className='border border-slate-300 rounded-xl p-3 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all w-full' 
                    name='skill' 
                    value={form.skill} 
                    onChange={handleChange}
                    placeholder="e.g. Listening"
                />
            </div>

            <div  className='flex gap-2 flex-col '>
                <label htmlFor="" className='text-lg font-medium text-slate-700'>Level</label>
                <select 
                    name="level" 
                    className='border border-slate-300 rounded-xl p-3 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all w-full bg-white' 
                    value={form.level} 
                    onChange={handleChange}
                    disabled={!form.course_title}
                >
                    <option value="">Select Level</option>
                    {form.course_title && getLevelsForCourse(form.course_title).map(level => (
                        <option key={level} value={level}>{level}</option>
                    ))}
                </select>
            </div>

            <div className='flex gap-2 flex-col mt-4'>
                <label htmlFor="" className='text-lg font-medium text-slate-700'>Select File</label>
                <input ref={fileInputRef} type="file" className='hidden' name='file' onChange={handleChange} />
                
                {!form.file ? (
                    <div onClick={handleFileClick} className="border-2 border-dashed border-slate-200 rounded-2xl p-10 text-center hover:border-green-500 hover:bg-green-50 transition-all cursor-pointer group">
                        <CloudUpload className="w-12 h-12 text-slate-300 mx-auto mb-3 group-hover:text-green-500 transition-colors" />
                        <p className="text-slate-500 font-medium group-hover:text-green-600">
                            Click to upload or drag and drop PDF/DOCX
                        </p>
                    </div>
                ) : (
                    <div className="border border-green-200 bg-green-50 rounded-2xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <FileText className="text-green-600 w-5 h-5" />
                            </div>
                            <div className="truncate">
                                <p className="font-bold text-slate-800 text-sm truncate">{form.file.name}</p>
                                <p className="text-xs text-slate-500">{(form.file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                        </div>
                        <button 
                            type="button" 
                            onClick={clearFile}
                            className="p-2 hover:bg-white rounded-full text-slate-400 hover:text-red-500 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>

            { loading ? <div className='flex justify-center p-3'>
                <Loader className="animate-spin text-green-600"/>
            </div> :

            <button type='submit' className='bg-[#059669] text-white text-lg font-bold p-4 w-full rounded-xl mt-4 hover:bg-[#047857] shadow-lg shadow-green-200 transition-all flex items-center justify-center gap-2'>
                <CloudUpload className="w-5 h-5"/> Upload Material
            </button>}
            
        </form>


        {
            mes && (
                <div className={`mt-6 p-4 rounded-xl text-center font-medium ${mes.includes("success") ? "bg-green-50 text-green-700" : "bg-slate-50 text-slate-600"}`}>
                    {mes}
                </div>
            )
        }
         </div>

    </section>
  )
}

export default Upload