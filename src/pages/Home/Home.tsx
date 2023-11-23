import style from './Home.module.css';
import { slide as Menu } from 'react-burger-menu'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { SwiperSlide } from 'swiper/react';
import { ApiContext } from '../../context/ApiContext';
import { auth } from '../../services/firebase';
import Carousel from '../../assets/components/Carousel/Carousel';
import CardHome from './CardHome/CardHome';
import FeaturedProducts from '../../assets/components/FeaturedProducts/FeaturedProducts';
import ButtonCategory from '../../assets/components/ButtonCategory/ButtonCategory';
import AnimatedDiv from '../../assets/components/AnimatedDiv/AnimatedDiv';
import menuIcon from './img/menuIcon.svg';
import audioIcon from './img/audioLogo.svg';
import userIcon from './img/userImage.png';
import searchIcon from './img/search.svg';

export function Home() {
    const [change, setChange] = useState<boolean>(true);
    const [isActiveHeadphones, setIsActiveHeadphones] = useState<boolean>(true);
    const [isActiveHeadsets, setIsActiveHeadsets] = useState<boolean>(false);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const {headphones, headsets} = useContext(ApiContext);
    const navigate = useNavigate();

    useEffect(() => {
        setIsActiveHeadsets(!change);
        setIsActiveHeadphones(change);
    }, [change]);

    const handleLogOut = () => {
        try {
            auth.signOut();
            setMenuOpen(false);
            navigate("/");
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }

    const settingsCategory = {
        slidesPerView: 1,
        spaceBetween: 50
    }

    const settingsFeatured = {
        slidesPerView: 2,
        spaceBetween: 15,
    }

    return(
        <AnimatedDiv>
            <header className={style.header}>
                <button  className={style.buttonMenu} onClick={() => setMenuOpen(!menuOpen)}>
                    <img src={menuIcon}/>
                </button>
                <div className={style.divIconAudio}>
                    <img src={audioIcon}/>
                    <h1 className={style.logo}>Audio</h1>
                </div>
                <img src={userIcon}/>
            </header>
            
            <div className={`${style.sideBar} ${menuOpen ? style.sideBarOpen : style.sideBar}`}>
                <button onClick={handleLogOut} className={style.buttonSideBar}>Logout</button>
                <button className={style.buttonSideBar}>My Orders</button>
                <button className={style.buttonSideBar}>Wishlist</button>
            </div>
            {/* <Menu>
                <Link to={'/shoppingCart'}>Cart</Link>
                <Link to={'#'}>My Orders</Link>
                <Link to={'#'}>Whishlist</Link>
            </Menu> */}

            <section className={style.container}>
                <p className={style.userName}>Hi, Andrea</p>
                <h1 className={style.title}>What are you looking for today?</h1>
                <Link to={'/search'}>
                    <div>
                        <input type="search" 
                            placeholder="Search headphone"
                            className={style.inputSearch}
                        />
                        <img src={searchIcon} className={style.searchIcon}/>
                    </div>
                </Link>
            </section>
            <section className={style.carouselSection}>
                <div>
                    <ButtonCategory
                        onClick={() => setChange(true)}
                        isActive={isActiveHeadphones}
                        label={"Headphones"}
                    />
                    <ButtonCategory
                        onClick={() => setChange(false)}
                        isActive={isActiveHeadsets}
                        label={"Headsets"}
                    />   
                    {change ? 
                        <Carousel settings={settingsCategory}>
                            {headphones.map((item) => (
                                <SwiperSlide key={item.id}>
                                    <CardHome 
                                        title={item.name}
                                        id={item.id}
                                    />
                                </SwiperSlide>
                            ))}
                        </Carousel> : 
                        <Carousel settings={settingsCategory}>
                            {headsets.map((item) => (
                                <SwiperSlide key={item.id}>
                                    <CardHome 
                                        title={item.name}
                                        id={item.id}
                                    />
                                </SwiperSlide>
                            ))}
                        </Carousel>
                    }
                </div>
                <div>
                    <div className={style.divSeeAll}>
                        <p>Featured Products</p>
                        <Link to={"/allProducts"} className={style.seeAll}>
                            <p>See All</p>
                        </Link>
                    </div>
                    <div>
                        <Carousel settings={settingsFeatured}>
                            {headsets.map((item) => (
                                <SwiperSlide key={item.id}>
                                    <FeaturedProducts
                                        name={item.name}
                                        price={item.price}
                                        id={item.id}
                                    />
                                </SwiperSlide>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </section>
        </AnimatedDiv>
    )
}
        