import {useRef, useState, useEffect} from 'react';
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';
import { useWindowScroll } from 'react-use';
import gsap from 'gsap'

const navItems = ['Nexus', 'Vault', 'Prologue', 'About', 'Contact' ];

const Navbar = () => {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false)
    const [isIndicatorActive, setIsIndicatorActive] = useState(false)
    const [lastScrollY, setlastScrollY] = useState(0)
    const [isNavVisible, setIsNavVisible] = useState(true)
    const navContainerRef = useRef();
    const audioElementRef = useRef();

    const { y : currentScrollY } = useWindowScroll();

    useEffect(() => {
    if (!navContainerRef.current) return;

    if (currentScrollY === 0) {
        setIsNavVisible(true);
        navContainerRef.current.classList.remove('floating-nav');
    } else if (currentScrollY > lastScrollY) {
        setIsNavVisible(false);
        navContainerRef.current.classList.add('floating-nav');
    } else if (currentScrollY < lastScrollY) {
        setIsNavVisible(true);
        navContainerRef.current.classList.add('floating-nav');
    }

    setlastScrollY(currentScrollY);
}, [currentScrollY, lastScrollY]);

    useEffect(()=> {
        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0: -100,
            opacity: isNavVisible ? 1: 0,
            duration: 0.2,
        })
    }, [isNavVisible])



    const toggleAudioIndicator = () => {
        setIsAudioPlaying((prev)=> !prev);
        setIsIndicatorActive((prev) => !prev)
    }

    useEffect(()=> {
        if(isAudioPlaying){
            audioElementRef.current.play();
        } else {
            audioElementRef.current.pause();
        }

    }, [isAudioPlaying])
    return (
    <div ref={navContainerRef} className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6">
        <header className="absolute top-1/2 w-full -translate-y-1/2">
            <nav className="flex w-full items-center justify-between px-6">
                
                {/* Left Section: Logo + Products Button */}
                <div className="flex items-center gap-6">
                    <img src="/img/logo.png" alt="logo" className="w-10" />
                    <Button 
                        id="product-button"
                        title="Products"
                        rightIcon={<TiLocationArrow />}
                        containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
                    />
                </div>

                {/* Right Section: Nav Items + Audio */}
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex gap-6">
                        {navItems.map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="nav-hover-btn">
                                {item}
                            </a>
                        ))}
                    </div>
                    <button className="flex items-center space-x-0.5" onClick={toggleAudioIndicator}>
                        <audio ref={audioElementRef} className="hidden" src="/audio/loop.mp3" loop />
                        {[1, 2, 3, 4].map((bar) => (
                            <div
                                key={bar}
                                className={`indicator-line ${isIndicatorActive ? 'active' : ''}`}
                                style={{ animationDelay: `${bar * 0.1}s` }}
                            />
                        ))}
                    </button>
                </div>
                
            </nav>
        </header>
    </div>
);
}

export default Navbar;