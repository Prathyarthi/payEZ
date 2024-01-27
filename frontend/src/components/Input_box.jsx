import React from 'react'

function Input_box({ label, placeholder }) {
    return (
        <div>
            <div className='text-sm font-medium text-left py-2'>
                {label}
            </div>
            <input type="text" placeholder={placeholder} className='w-full p-2 border rounded boder-slate-200' />
        </div>
    )
}

export default Input_box