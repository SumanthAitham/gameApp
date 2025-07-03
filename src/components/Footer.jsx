import React from 'react';
import { FaDiscord, FaInstagram, FaLinkedin } from 'react-icons/fa';

const links = [
    { href: "https://discord.com", icon: <FaDiscord /> },
    { href: "https://instagram.com", icon: <FaInstagram /> },
    { href: "https://linkedin.com", icon: <FaLinkedin /> }


]


const Footer = () => {
    return (
        <footer className="w-screen bg-violet-300 py-4 text-black" >
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
                <p className="text-center text-sm md:text-left">
                    &copy; TSC 2025. All rights reserved
                </p>
                <div className="flex justify-center gap-4 md:justify-start">
                    {links.map((link) => (
                        <a key={link} href={link.href} target="_blank" rel="noopener noreferrer" className="text-black text-2xl transition-colors duration-500 ease-in-out hover:text-white">
                            {link.icon}
                        </a>
                    ))}
                </div>

            </div>
        </footer >
    )
}

export default Footer