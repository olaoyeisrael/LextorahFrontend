import React, { useRef, useState, useEffect } from 'react'
import { CloudUpload, Loader } from 'lucide-react'
import { isAdmin, getToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

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
        console.log(form)
    };

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setLoading(true)
        const formData = new FormData()
        formData.append("course_title", form.course_title);
        formData.append("topic", form.topic);
        formData.append("skill", form.skill);
        formData.append("level", form.level);
        formData.append("file", form.file);

        console.log("formdata: ", formData)
    
        const token = getToken();
        const res = await fetch('http://localhost:8000/upload',{
            method: "POST",
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        const response = await res.json()
        console.log("Response: ",response)
        setMes(response.msg)
        setLoading(false)
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

    const handleFileClick = () => {
        fileInputRef.current.click()
        console.log("file clicked")
    }


  return (
    <section className='max-w-3xl mx-auto p-4 md:p-8'>
        <div className='bg-white rounded-3xl shadow-xl border border-green-50 p-8 md:p-12'>

       
        <h1 className='font-bold font-MadaBold  text-3xl text-[#059669] mt-3'>Upload Materials</h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-6 '>
            <div className='flex gap-2 flex-col '>
                <label htmlFor="" className='text-lg '>Course: </label>
                <input type="text" className='border border-[#1D305F] rounded p-2  hover:border-green-500/50 hover:bg-green-50/50 transition-all w-full'name='course_title' value={form.course_title} onChange={handleChange}/>
            </div>
            <div  className='flex gap-2 flex-col '>
                <label htmlFor="" className='text-lg '>Topic/Module: </label>
                <input type="text" className='border border-[#1D305F] rounded p-2 hover:border-green-500/50 hover:bg-green-50/50 transition-all w-full' name='topic' value={form.topic} onChange={handleChange} />
            </div>
            <div  className='flex gap-2 flex-col '>
                <label htmlFor="" className='text-lg '>Skill: </label>
                <input type="text" className='border border-[#1D305F] rounded p-2 hover:border-green-500/50 hover:bg-green-50/50 transition-all w-full' name='skill' value={form.skill} onChange={handleChange} />
            </div>
            <div  className='flex gap-2 flex-col '>
                <label htmlFor="" className='text-lg '>Level: </label>
                <input type="text" className='border border-[#1D305F] rounded p-2 hover:border-green-500/50 hover:bg-green-50/50 transition-all w-full' name='level' value={form.level} onChange={handleChange} />
            </div>
            <div className='flex gap-2 flex-col '>
                <label htmlFor="" className='text-lg'>Select File: </label>

                <input ref={fileInputRef} row={6} type="file" className='hidden' name='file' onChange={handleChange} />
                <div onClick={handleFileClick} className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-green-500/50 hover:bg-green-50/50 transition-all cursor-pointer group">
                    <CloudUpload className="w-8 h-8 text-slate-400 mx-auto mb-2 group-hover:text-green-500 transition-colors" />
                    <p className="text-sm text-slate-500 group-hover:text-green-600">
                        Click to upload or drag and drop PDF/DOCX
                    </p>
                </div>
            </div>

            { loading ? <div className='flex justify-center p-3'>
                <Loader/>
            </div> :

            <button type='submit' className='bg-[#059669] text-white text-xl p-3 w-fit rounded-xl mt-3 hover:cursor-grab w-full items-center justify-center flex gap-2'>
                <CloudUpload/> Upload Material
            </button>}
            
        </form>


        {
            mes && <h1 className='mt-3'>{mes}</h1>
        }
         </div>

    </section>
  )
}

export default Upload