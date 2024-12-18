import React, { useState } from 'react'

const Input = ({ name, type, placeholder, value, onChange, isTable }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [error, setError] = useState(false);

    const handlefocus = () => {
        setIsFocused(true);
        setError(false);
    };

    const handleBlur = () => {
        setIsFocused(false);
        if (!value?.trim()) {
            setError(true);
        }
    }

    return (
        <>
        {isTable ?(
            <>
                 <input
                 type={type}
                 name={name}
                 placeholder={placeholder}
                 value={value || ''}
                 onChange={onChange}
                 className={`p-2 text-base outline-none border-none
                     transition-all duration-100 ease-in-out rounded-2xl `}
             />
            </>
        ):(
             <div className='w-full p-4 flex flex-col gap-2'>
             <label className='text-[16px] font-semibold'>{name}{" "}<span className='text-red-500'>*</span></label>
             <input
                 type={type}
                 name={name}
                 placeholder={placeholder}
                 value={value || ''}
                 onFocus={handlefocus}
                 onBlur={handleBlur}
                 onChange={onChange}
                 className={`p-2 w-full min-w-40 text-base ${isFocused ? 'outline-[#7B90FF] border-white' : 'outline-white border'} 
                     transition-all duration-100 ease-in-out outline rounded-2xl`}
             />
             {error && (
                 <div className='text-red-500 text-[0.9rem]'>{name} is required</div>
             )}
         </div>
        )}
        </>
    )
}

export default Input