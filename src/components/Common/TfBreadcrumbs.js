import React from 'react'

export default function TfBreadcrumbs({ breadcrumb }) {
    return (
        <>
            <nav className='breadcrumb_wrap'>
                <ul>
                    {breadcrumb.map(({ label, link, active}) => (
                        <li key={label}>
                            <a href={link} className={active ? 'breadcrumb_active' : ''}>{label}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )
}
