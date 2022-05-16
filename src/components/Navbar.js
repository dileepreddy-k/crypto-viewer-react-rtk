import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

// Ant-design components
import { Typography, Menu, Button } from 'antd';

// Ant-design icons
import { HomeOutlined, DollarOutlined, SwapOutlined, MenuOutlined } from '@ant-design/icons';

const NavBar = ({ fixed }) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(null);
    const [showMenuIcon, setShowMenuIcon] = useState(false);

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if(screenSize < 768) {
            setActiveMenu(false);
            setShowMenuIcon(true);
        } else {
            setActiveMenu(true);
            setShowMenuIcon(false);
        }
    }, [screenSize]);

    return (
        <>
            <Typography.Title level={3} className="logo">
                <NavLink to="/">Crypto</NavLink>
            </Typography.Title>
            {
                showMenuIcon && (
                    <Button onClick={() => setActiveMenu(!activeMenu)}>
                        <MenuOutlined />
                    </Button>
                )
            }
            
            {
                activeMenu && (
                        <Menu theme='dark' className={fixed}>
                            <Menu.Item icon={<HomeOutlined />} key="home">
                                <NavLink to="/">Home</NavLink>
                            </Menu.Item>
                            <Menu.Item icon={<DollarOutlined />} key="cryptocurrencies">
                                <NavLink to="/cryptocurrencies">Crypto Currencies</NavLink>
                            </Menu.Item>
                            <Menu.Item icon={<SwapOutlined />} key="exchanges">
                                <NavLink to="/exchanges">Exchanges</NavLink>
                            </Menu.Item>
                        </Menu>
                )
            }
        </>    
    )
}

export default NavBar;